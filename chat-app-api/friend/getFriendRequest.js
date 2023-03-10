const db = require('../config.js');

const getFriendRequest = (req, res) => {
    const { user_id } = req.params;
    if (user_id) {
        // check exist pending request
        db.select('*')
            .from('friend_list')
            .where('friend_list.user_id2', '=', user_id)
            .andWhere('friend_list.is_friend', '=', 'pending')
            .andWhere('friend_list.status', '=', true)
            .join('user', 'user.user_id', '=', 'friend_list.user_id1')
            .then((rows) => {
                if (rows.length === 0) {
                    res.json({ status: 'success', request: [] })
                }
                else if (rows.length > 0) {
                    let requestList = rows.map(request => {
                        return {
                            user_id: request.user_id1,
                            name: request.name
                        }
                    })
                    res.json({ status: 'success', request: requestList })
                }
            }).catch((error) => {
                console.error(error);
            });
    }
    else {
        res.json({ status: 'error' })
    }
}

module.exports = getFriendRequest;