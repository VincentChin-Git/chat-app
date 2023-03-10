const db = require('../config.js');

const deleteFriend = (req, res) => {
    const { user_id1, user_id2 } = req.body;
    if (user_id1 && user_id2) {
        db('friend_list').where({ user_id1, user_id2 })
            .update({ status: false })
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

module.exports = deleteFriend;