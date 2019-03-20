import { types } from "mobx-state-tree"

const Profile = types.model({
    username: "",
    breakdownFields: ['Mentions', 'Hashtags', 'Image Content', 'Tagged Locations', 'Brand Partners', 'Tagged Accounts']
    
});


const Post = types.model({
    caption: '',
    type: '',
    likesCount: null,
    commentsCount: null,
    engagements: null,
    engagementRate: null,
    followersCount: null,
});
