// modules
const express = require('express');
const cors = require('cors');

// imported handler
// profile
const newProfile = require('./profile/newProfile');
const loginProfile = require('./profile/loginProfile');
const editProfile = require('./profile/editProfile');
const { uploadProfileImage, storeProfileImage } = require('./profile/editProfileImage')
const getProfileImage = require('./profile/getProfileImage');

// friend
const addFriend = require('./friend/addFriend');
const getFriendRequest = require('./friend/getFriendRequest');
const resFriendRequest = require('./friend/resFriendRequest');
const getFriend = require('./friend/getFriend');
const deleteFriend = require('./friend/deleteFriend');
const searchFriend = require('./friend/searchFriend');

// chat / msg
const sendMsg = require('./chat/sendMsg');
const getChatList = require('./chat/getChatList');
const getChat = require('./chat/getChat');
const deleteMsg = require('./chat/deleteMsg');
const deleteChat = require('./chat/deleteChat');
const pinChat = require('./chat/pinChat');

// group
const { newGroup, storeGroupImage } = require('./group/newGroup')
const { editGroupImage, storeEditGroupImage } = require('./group/editGroupImage')
const editGroupName = require('./group/editGroupName');
const addMember = require('./group/addMember');
const getGroupMember = require('./group/getGroupMember');
const deleteMember = require('./group/deleteMember');
const quitGroup = require('./group/quitGroup');

// other
const receiveNotification = require('./others/receiveNotification');
const profileImage = require('./others/profileImage');
const groupImage = require('./others/groupImage');

const app = express();
app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
    res.json(req.query);
});

// route
// profile
app.post('/newProfile', newProfile);
app.post('/loginProfile', loginProfile);
app.post('/editProfile', editProfile);
app.post('/editImage', storeProfileImage.single('image'), uploadProfileImage);
app.get('/getImage/:user_id', getProfileImage);

// friend
app.post('/addFriend', addFriend);
app.get('/getFriendRequest/:user_id', getFriendRequest);
app.post('/resFriendRequest', resFriendRequest);
app.get('/getFriend/:user_id', getFriend);
app.post('/deleteFriend', deleteFriend);
app.get('/searchFriend/:user_id/:friend_name', searchFriend);

// chat / msg
app.post('/sendMsg', sendMsg);
app.get('/getChatList/:user_id', getChatList);
app.get('/getChat/:user_id/:chat_id', getChat);
app.post('/deleteMsg', deleteMsg);
app.post('/deleteChat', deleteChat);
app.post('/pinChat', pinChat);

// group
app.post('/newGroup', storeGroupImage.single('group_image'), newGroup);
app.post('/editGroupImage', storeEditGroupImage.single('group_image'), editGroupImage);
app.post('/editGroupName', editGroupName);
app.post('/addMember', addMember);
app.get('/getGroupMember/:group_id', getGroupMember);
app.post('/deleteMember', deleteMember)
app.post('/quitGroup', quitGroup)

// other
app.get('/receiveNotification/:user_id', receiveNotification);
app.get('/profileImage/:url', profileImage);
app.get('/groupImage/:url', groupImage);

app.listen(4000);