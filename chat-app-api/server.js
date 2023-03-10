// modules
const express = require('express');
const cors = require('cors');

// imported handler
const newProfile = require('./profile/newProfile');
const loginProfile = require('./profile/loginProfile');
const editProfile = require('./profile/editProfile');
const { uploadProfileImage, storeProfileImage } = require('./profile/editProfileImage')
const getProfileImage = require('./profile/getProfileImage');

const app = express();
app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
    res.json(req.query);
});

app.post('/newProfile', newProfile);
app.post('/loginProfile', loginProfile);
app.post('/editProfile', editProfile);

app.post('/editImage', storeProfileImage.single('image'), uploadProfileImage);
app.get('/getImage/:user_id', getProfileImage);

app.listen(4000);