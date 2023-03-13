const db = require('../config.js');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/media/groupImage')
    },
    filename: (req, file, cb) => {
        const { user_id } = req.body;
        const commaIndex = file.originalname.indexOf('.');
        const extension = file.originalname.substring(commaIndex);
        cb(null, Date.now() + '-' + user_id + extension)
    }
})

const storeGroupImage = multer({ storage })

async function newGroup(req, res) {
    const { user_id, group_name, member_list } = req.body;
    const { filename } = req.file;
    if (user_id && filename && group_name && member_list.length > 0) {
        let group_id = await db('group').insert({ group_name, group_image: filename, admin_id: user_id })
            .returning('group_id');
        group_id = group_id[0].group_id;

        let chat_id = await db('chat').insert({ group_id })
            .returning('chat_id');
        chat_id = chat_id[0].chat_id;

        for (let index = 0; index < member_list.length; index++) {
            let member_id = member_list[index];
            await db('user_chat').insert({ chat_id, user_id: member_id });
        }
        await db('user_chat').insert({ chat_id, user_id }).returning('*');

        res.json({ status: 'success' })

    }
    else {
        res.json({ status: 'error' })
    }
}

module.exports = {
    newGroup,
    storeGroupImage,
};