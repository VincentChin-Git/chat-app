const db = require('../config.js');
const { serverPath } = require('../utils/global_const.js');

const profileImage = (req, res) => {
    const { url } = req.params;
    const imagePath = `${serverPath}/profileImage/${url}`;
    res.sendFile(imagePath)
}

module.exports = profileImage;