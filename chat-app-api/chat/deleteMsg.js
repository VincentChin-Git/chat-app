const db = require('../config.js');

const deleteMsg = (req, res) => {
    const { msg_id, chat_id } = req.body;
    // res.json(req.body);
    if (msg_id && chat_id) {
        db('msg').where({ msg_id, chat_id })
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

module.exports = deleteMsg;