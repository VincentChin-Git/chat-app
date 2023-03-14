const db = require('../config.js');
const { serverPath } = require('../utils/global_const.js');

const groupImage = (req, res) => {
    const { url } = req.params;
    const imagePath = `${serverPath}/groupImage/${url}`;
    res.sendFile(imagePath)
}

module.exports = groupImage;