import { types } from "mobx-state-tree"

const Post = types.model({
    caption: '',
    type: '',
    likesCount: null,
    commentsCount: null,
    engagements: null,
    engagementRate: null,
    followersCount: null,
});
