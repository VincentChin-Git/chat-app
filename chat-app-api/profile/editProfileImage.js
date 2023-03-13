const db = require('../config.js');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/media/profileImage')
    },
    filename: (req, file, cb) => {
        const { user_id } = req.body;
        const commaIndex = file.originalname.indexOf('.');
        const extension = file.originalname.substring(commaIndex);
        cb(null, Date.now() + '-' + user_id + extension)
    }
})

const storeProfileImage = multer({ storage })

const uploadProfileImage = (req, res) => {
    const { user_id } = req.body;
    const { filename } = req.file;
    if (user_id && filename) {
        db('user').where({ user_id })
            .update({ image: filename })
            .then(() => {
                res.json({ status: 'success', filename })
            }).catch((error) => {
                console.error(error);
            });
    }
    else {
        res.json({ status: 'error' })
    }
}

module.exports = {
    uploadProfileImage,
    storeProfileImage,
};