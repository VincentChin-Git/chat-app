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

app.listen(4000);