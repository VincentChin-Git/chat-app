const db = require('../config.js');

const deleteChat = (req, res) => {
    const { user_id, chat_id } = req.body;
    // res.json(req.body);
    if (user_id && chat_id) {
        db('user_chat').where({ user_id, chat_id })
            .update({ status: false })
            .then(() => {
                res.json({ status: 'success' })
            }).catch((error) => {
                console.error(error);
            });


        res.json({ status: 'success' })

    }
    else {
        res.json({ status: 'error' })
    }
}

module.exports = deleteChat;