/*
- First Name
- Last Name
- Phone No
- Profile Picture
*/
const {model,Schema} = require('mongoose');

const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        required: true
    },
    profilePic: {
        type: String
    },

},{timestamps: true});
const Profile = model('profile',ProfileSchema);
module.exports = Profile;