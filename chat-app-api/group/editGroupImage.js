const db = require('../config.js');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/media/groupImage')
    },
    filename: (req, file, cb) => {
        const { group_id } = req.body;
        const commaIndex = file.originalname.indexOf('.');
        const extension = file.originalname.substring(commaIndex);
        cb(null, Date.now() + '-' + group_id + extension)
    }
})

const storeEditGroupImage = multer({ storage })

const editGroupImage = (req, res) => {
    const { group_id, user_id } = req.body;
    const { filename } = req.file
    if (group_id && user_id && filename) {
        db('group').where({ group_id, admin_id: user_id })
            .update({ group_image: filename })
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
    editGroupImage,
    storeEditGroupImage,
};