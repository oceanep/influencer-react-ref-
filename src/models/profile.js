import { types } from "mobx-state-tree"

const Profile = types.model("Profile",{
    username: types.string,
});


export default Profile;
