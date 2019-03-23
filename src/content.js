/*global chrome*/
/* src/content.js */
import React from 'react';
import ReactDOM from 'react-dom';
import "./content.css";
import "antd/dist/antd.css";
import ProfileHeader from "./components/profile_header.js";
import EngagementComponent from "./components/engagement.js";
import { Layout } from 'antd';
//import { observer, inject } from "mobx-react";
const { Header, Content, Footer} = Layout;



var profileRegex =  /^\/([\w.\-_]+)\/$/

class Main extends React.Component {
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
        var username = this.profileRegex.exec(document.location.pathname);
        username = username ? username[1] : null;
        if (username) {	    
	    //use profile action setter
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

    componentDidMount(){
	
	if (profileRegex.test(document.location.pathname)) {
	    this.subscribeToEvents();
	    this.waitForEntryData()
		.then(data => this.addProfile(data))
		.catch(data => data)
		.then(profile => this.showProfile(profile.id));
	}
	else{
            return;
	}
    }


    addProfile(data) {
	/*
       if (!isEmpty(data) && !_.get(data, 'graphql.user.is_private')) {
	   console.log("got profile", data);
            //return this.profiles.addProfile(data);
        } else {
            return Promise.resolve({})
            }*/
	return;
    }

    showProfile(username) {
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
        	      <ProfileHeader profile={ profile } />
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


/*
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
*/
export default Main;
