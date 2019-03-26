/*global chrome*/
/* src/content.js */
import React from 'react';
import ReactDOM from 'react-dom';
import Backbone from 'backbone';
import "./content.css";
import "antd/dist/antd.css";
import ProfileHeader from "./components/profile_header.js";
import EngagementComponent from "./components/engagement.js";
import { Layout } from 'antd';
const { Header, Content, Footer} = Layout;

var helpers = require('./utils/helpers.js');
var _ = require('underscore');

var profileRegex =  /^\/([\w.\-_]+)\/$/
var enrichEnabled = true;

class Main extends React.Component {
       
    constructor(props) {
	super(props);
	this.state = {
	    profile: {
		username: ""
	    }
	}
    }

    subscribeToEvents() {	
        document.addEventListener('navigate_profile', e => this.onProfileLoaded());
        document.addEventListener('profile_page_loaded', e => this.onProfileLoaded());
        document.addEventListener('timeline_data', e => {
            const url = `https://${ window.location.hostname }` + e.detail.requestData.url;
            const request = this.requestsData.addRequest(url).toJSON();

            if (!this.requestsData.headers) {
                this.requestsData.headers = e.detail.requestData.headers
            }

            this.vent.trigger(`timeline_data:${ request.user_id }`, e.detail);
        });
    }

    onProfileLoaded() {
        var username = profileRegex.exec(document.location.pathname);
        username = username ? username[1] : null;
        if (username) {
	    this.setState({
		profile : {
		    username: username
		}})	    
            return this.profiles.loadProfile(username)
                .then(data => this.addProfile(data))
                .then(() => this.showProfile(username));
        }
    }

    waitForEntryData() {
        return new Promise(function(resolve, reject){
            document.addEventListener('entry_data', e => resolve(e.detail));
        });
    }

    addRequest(url) {
        const params = JSON.parse(helpers.extractQueryParam(url, 'variables'));
        return this.add({
            user_id: params.id,
            url: url,
            nextPageToken: params.after
        }, {merge: true});
    }
    
    componentDidMount(){
	//var username = profileRegex.exec(document.location.pathname);
        //username = username ? username[1] : null;
	this.profiles = new ProfilesCollection();
	console.log("bb collection", this.profiles);
	this.subscribeToEvents();
	this.waitForEntryData()
	    .then(data => this.addProfile(data))
	    .catch(data => data)
	    .then(profile => this.showProfile(profile));
    }


    addProfile(data) {
	if (data){
	    var profile = data['graphql']['user'];
	    var posts = (profile["edge_owner_to_timeline_media"]["edges"] || []).map(item => item.node)
            //var initialPosts = (helpers.custom_get(data, 'edge_owner_to_timeline_media.edges') || []).map(item => item.node);	    
	    console.log("Posts: ", posts);
	    console.log(profile);
	    //this.processProfile(profile);	  
            return this.profiles.addProfile(data);
        } else {
            return Promise.resolve({})
        }
	return;
    }

    processProfile(profile){
	var username = profile['username'];
	this.setState({
	    profile : {
		username: username
	    }})	    	
    }

    
    showProfile(username) {
	const profile = this.profiles.get(username);
	console.log("profile from memory", profile);
	return;
    }

    render() {
	const {profile} = this.props;
        return (
            <div
              className={'influencer-main'}
              style={{ float: 'right'}}
              >
        	    <Layout>
        	    <Header style={{ backgroundColor: 'rgb(38,40,70)'}}>
        	<ProfileHeader profile={this.state.profile} />
        	    </Header>
        	    <Content>
        	<EngagementComponent profile_name={this.props.profile_name} />
        	</Content>
        	</Layout>
        	    <Footer>Scroll Down Component</Footer>
            </div>
        )
    }
}


var ProfileModel = Backbone.Model.extend({
    idAttribute: 'username',
    defaults: {
        rawData: {},
    },
    breakdownFields: ['Mentions', 'Hashtags', 'Image Content', 'Tagged Locations', 'Brand Partners', 'Tagged Accounts'],

    initialize() {
        var data = this.toJSON();
        this.posts = new Posts();
        this.firstPostsLoaded = false;
        this.listenTo(this.posts, 'update', () => {
            this.calculateAverages();
            this.parseKeywords();
        });

        data.followersCount = helpers.custom_get(data, 'edge_followed_by.count') || 0;
        this.set(data);

        const initialPosts = (helpers.custom_get(data, 'edge_owner_to_timeline_media.edges') || []).map(item => item.node);

        this.initialPostsProcessed = new Promise((resolve, reject) => {
            if (initialPosts.length) {
                this.enrichPostsData(initialPosts)
                    .then(posts => this.processPosts(posts))
                    .then(resolve);
            } else {
                resolve();
            }
        });

        if (window.app.requestsData.get(data.user_id)) {
            this.loadFirstPosts();
        }

        this.listenTo(window.app.vent, `timeline_data:${ data.user_id }`, data => {
            this.onNewPostsData(data.timeline);
            this.loadFirstPosts();
        });

        // loadAccountInfo(this.id);
    },

    onNewPostsData(data) {
        const posts = _.isArray(data) ? data : helpers.custom_get(data, 'data.user.edge_owner_to_timeline_media.edges').map(item => item.node);
        this.enrichPostsData(posts).then(posts => this.processPosts(posts));
    },

    processPosts (posts) {
        if (!posts || !posts.length) {
            return;
        }

        const account = this.toJSON();
        posts = posts || [];
        posts = posts.map(post => {
            post = post.node ? post.node : post;
            post.followersCount = account.followersCount;
            return post;
        });
        this.posts.add(posts);
        return Promise.resolve();
    },

    calculateAverages() {
        const account = this.toJSON();
        const posts = this.posts.toJSON();
        const videoPosts = posts.filter(post => post.type === 'video');
        const imagePosts = posts.filter(post => post.type !== 'video');
        const firstPostDate = posts[posts.length - 1].postDate;

        account.avgLikes = helpers.average(posts, 'likesCount');
        account.avgComments = helpers.average(posts, 'commentsCount');
        account.postsPerDay = posts.length / ((Date.now() - firstPostDate) / 1000 / 3600 / 24);

        account.engagementRate = helpers.average(posts, 'engagements') / (account.followersCount || 1);

        account.avgLikesPerImage = helpers.average(imagePosts, 'likesCount');
        account.avgCommentsPerImage = helpers.average(imagePosts, 'commentsCount');
        account.engagementRateImages = helpers.average(imagePosts, 'engagements') / (account.followersCount || 1);

        account.avgLikesPerVideo = helpers.average(videoPosts, 'likesCount');
        account.avgCommentsPerVideo = helpers.average(videoPosts, 'commentsCount');
        account.avgViewsPerVideo = helpers.average(videoPosts, 'viewsCount');
        account.engagementRateVideos = helpers.average(videoPosts, 'engagements') / (account.followersCount || 1);

        account.imagesCount = imagePosts.length;
        account.videosCount = videoPosts.length;

        this.set(account);
    },

    parseKeywords() {
        var account = this.toJSON(),
            posts = this.posts.toJSON(),
            fields = this.breakdownFields,
            result = {};

        posts.forEach(post => {
            fields.forEach(item => {
                const key = item.toCamelCase();
                if (post[key]) {
                    result[item] = (result[item] || []).concat(post[key]);
                }
            });
        });

        fields.forEach(key => {
            const values = result[key];

            result[key] = _.chain(values)
                .countBy(keyword => keyword)
                .mapObject((num, keyword) => {
                    return {
                        Num: num,
                        Keyword: keyword,
                        Frequency: num / posts.length,
                        Link: this.getLink(key, keyword)
                    };
                })
                .values()
                .value()
                .sort((prev, next) => { return next.Num - prev.Num; });
        });
        _.extend(account, result);
        this.set(account);
    },

    getLink(type, keyword) {
        if (['Mentions', 'Brand Partners', 'Tagged Accounts'].includes(type)) {
            return `https://www.instagram.com/${ keyword.replace(/[@]/g, '') }/`
        } else if (type === 'Hashtags') {
            return `https://www.instagram.com/explore/tags/${ keyword.replace(/[#]/g, '') }/`;
        } else if (type === 'Tagged Locations') {
            const locationId = this.posts.toJSON().find(function(post){
                return helpers.custom_get(post, 'rawData.location.name') === keyword;
            }).rawData.location.id;
            return `https://www.instagram.com/explore/locations/${ locationId }/`;
        } else {
            return null;
        }
    },

    loadFirstPosts() {
        if (this.firstPostsLoaded) {
            return;
        }

        this.firstPostsLoaded = true;
        this.loadPosts(100);
    },

    async loadPosts(count) {
        let posts = [];
        const requestData = window.app.requestsData.get(this.get('user_id'));

        while (count > 0) {
            let loadedPosts = await this.getPosts(requestData.get('nextPageToken'));
            posts = posts.concat(loadedPosts.posts);
            requestData.set('nextPageToken', loadedPosts.nextPageToken);
            count -= 50;
        }

        return this.onNewPostsData(posts);
    },

    async getPosts(pageToken) {
        const requestData = window.app.requestsData.get(this.get('user_id'));
        const initialUrl = requestData.get('url').replace('first%22%3A12', 'first%22%3A50');
        let url;

        if (pageToken) {
            url = new URL(initialUrl);
            let variables = JSON.parse(helpers.extractQueryParam(initialUrl, 'variables'));
            variables.after = pageToken;
            url.searchParams.set('variables', JSON.stringify(variables));
            url = url.toString();
        } else {
            url = initialUrl;
        }

        return fetch(url, {headers: window.app.requestsData.headers})
            .then(res => res.json())
            .then(response => {
                const posts = helpers.custom_get(response, 'data.user.edge_owner_to_timeline_media.edges').map(item => item.node);
                const pageInfo = helpers.custom_get(response, 'data.user.edge_owner_to_timeline_media.page_info');

                return {
                    posts,
                    nextPageToken: pageInfo.has_next_page ? pageInfo.end_cursor : null
                };
            });
    },

    enrichPostsData(posts) {
        if (!enrichEnabled) {
            return Promise.resolve(posts);
        }

        const promises = posts.map(post => {
            return new Promise((resolve, reject) => {
                const url = `https://www.instagram.com/p/${ post.shortcode }/?__a=1`;
                fetch(url).then(res => res.json())
                    .catch(e => {console.log(e); return {};})
                    .then(res => {
                        Object.assign(post, res.graphql.shortcode_media);
                        resolve(post);
                    });
            });
        });

        return Promise.all(promises);
    }
});

var ProfilesCollection = Backbone.Collection.extend({
    model: ProfileModel,

    loadProfile(username) {
        if (this.get(username)) {
            return Promise.resolve(this.get(username))
        } else {
            return this.fetchProfile(username);
        }
    },

    fetchProfile(username) {
        const url = `https://instagram.com/${ username }/?__a=1`;
        return fetch(url)
            .then(res => res.json());
    },

    addProfile(data){
        let profile;
        if (data.graphql && data.graphql.user) {
            profile = helpers.custom_get(data, 'graphql.user');
        } else {
            profile = data;
        }
	
        profile.rawData = Object.assign({}, profile);
        profile.user_id = profile.id;
        delete profile.id;
	console.log("This is the profile!", profile);
        return this.add(profile, { merge: true });
    }
});



var Post = Backbone.Model.extend({
    defaults: {
        caption: '',
        type: '',
        likesCount: null,
        commentsCount: null,
        engagements: null,
        engagementRate: null,
        followersCount: null,
    },

    typesMap: {
        'GraphSidecar': 'carousel',
        'GraphVideo': 'video',
        'GraphImage': 'image',
    },

    initialize() {
	console.log("initializing profile");
        this.parse();
        this.calculateEngagementRate();
        this.parseAccessibilityCaption();
        this.parseTaggedAccounts();
    },

    parse() {
        const post = this.toJSON();

        var result = {rawData: Object.assign({}, post)};
        result.caption = helpers.custom_get(post, 'edge_media_to_caption.edges.0.node.text') || '';
        result.taggedLocations = helpers.custom_get(post, 'location.name') || null;
        result.brandPartners = helpers.custom_get(post, 'edge_media_to_sponsor_user.edges.0.node.sponsor.username') || null;
        result.isPaid = !!result.sponsor;
        result.postDate = post.taken_at_timestamp * 1000;

        result.mentions = result.caption.match(/(@[\w\d_]+)/g) || [];
        result.hashtags = result.caption.match(/(#[\w\d_]+)/g) || [];
        result.type = this.typesMap[post.__typename] || 'image';
        result.likesCount = helpers.custom_get(post, 'edge_media_preview_like.count') || 0;
        result.commentsCount = helpers.custom_get(post, 'edge_media_to_comment.count') || 0;
        result.viewsCount = post.video_view_count || 0;
        result.engagements = result.likesCount + result.commentsCount;

        this.set(result);
        return this.toJSON();
    },

    calculateEngagementRate () {
        return this.get('engagements') / (this.get('followersCount') || 1);
    },

    parseAccessibilityCaption() {
        let rawData = this.get('rawData');
        let caption = '';
        let contents = [];

        if (this.get('type') === 'carousel') {
            const children = helpers.custom_get(rawData, 'edge_sidecar_to_children.edges') || [];
            caption = children.map(item => item.node.accessibility_caption).join(' ');
        } else {
            caption = rawData.accessibility_caption || '';
        }

        contents = caption.replace(/(Image may contain: )|(No automatic alt text available\.)|(and )|([,]?a )|(,)/g, '')
            .replace(/(1|\d|one or more) (people|person)|(people standing)/g, ' people ')
            .replace(/(text that says '\w+')/g, ' text ')
            .replace(/\s+/g, ' ')
            .trim()
            .split(' ')
            .filter(item => item);

        contents = _.uniq(contents);

        this.set('imageContent', contents);
    },

    parseTaggedAccounts() {
        let rawData = this.get('rawData');
        let taggedAccounts = (helpers.custom_get(rawData, 'edge_media_to_tagged_user.edges') || [])
            .map(item => '@' + item.node.user.username);

        this.set('taggedAccounts', taggedAccounts || []);
    }
});

var Posts = Backbone.Collection.extend({
    model: Post
});



//COMMENTING OUT CHROME SPECIFIC SECTION

const app = document.createElement('div');
app.id = "influencer-root";

var target_location = document.querySelectorAll('#react-root section main')[0];
target_location.classList.add('with-sidebar');
target_location.appendChild(app);
ReactDOM.render(<Main />, app);


//app.style.display = "none";

chrome.runtime.onMessage.addListener(
   function(request, sender, sendResponse) {
       if(request.message === "clicked_browser_action") {
        toggle();
      }
   }
);


function toggle(){
   if(app.style.display === "none"){
       app.style.display = "block";
       target_location.classList.add('with-sidebar');
   }else{
       app.style.display = "none";
       target_location.classList.remove('with-sidebar');
   }
}

export default Main;
