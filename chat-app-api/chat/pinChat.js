const db = require('../config.js');

const pinChat = (req, res) => {
    const { user_id, chat_id, pin } = req.body;
    if (user_id && chat_id) {

        if (pin === true) {
            db('user_chat').where({ chat_id, user_id })
                .update({ pinned: true })
                .then(() => {
                    res.json({ status: 'success' })
                }).catch((error) => {
                    console.error(error);
                });
        }

        else if (pin === false) {
            db('user_chat').where({ chat_id, user_id })
                .update({ pinned: false })
                .then(() => {
                    res.json({ status: 'success' })
                }).catch((error) => {
                    console.error(error);
                });
        }

        else {
            res.json({ status: 'error' })
        }
    }
    else {
        res.json({ status: 'error' })
    }
}

module.exports = pinChat;