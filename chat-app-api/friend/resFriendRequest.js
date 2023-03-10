const db = require('../config.js');

const resFriendRequest = (req, res) => {
    const { user_id1, user_id2, action } = req.body;
    if (user_id1 && user_id2 && action) {
        if (action == 'accept') {
            db('friend_list').where({ user_id1, user_id2, status: true, is_friend: 'pending' })
                .update({ is_friend: 'friend' })
                .then(() => {
                    res.json({ status: 'success' })
                }).catch((error) => {
                    console.error(error);
                });
        }
        else if (action == 'reject') {
            db('friend_list').where({ user_id1, user_id2, status: true, is_friend: 'pending' })
                .update({ status: false })
                .then(() => {
                    res.json({ status: 'success' })
                }).catch((error) => {
                    console.error(error);
                });
        }
    }
    else {
        res.json({ status: 'error' })
    }
}

module.exports = resFriendRequest;