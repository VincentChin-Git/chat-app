const db = require('../config.js');

async function getFriend(req, res) {
    const { user_id } = req.params;
    if (user_id) {
        let friend_id_list = await getFriendIDList(user_id);
        friend_id_list = friend_id_list.map(friend_id => {
            if (friend_id.user_id1 == user_id) {
                return friend_id.user_id2
            }
            else {
                return friend_id.user_id1;
            }
        })
        let friend_list = [];
        for (let index = 0; index < friend_id_list.length; index++) {
            let friend_detail = await getFriendDetail(friend_id_list[index])
            friend_list = [...friend_list, friend_detail]
        }
        res.json({ status: 'success', friend_list })
    }
    else {
        res.json({ status: 'error' })
    }
}

async function getFriendIDList(user_id) {
    const friendList = await db.select('*')
        .from('friend_list')
        .whereRaw('(user_id1 = ? or user_id2 = ?) and is_friend = ? and status = ?', [user_id, user_id, 'friend', true])
    return friendList;
}

async function getFriendDetail(friend_id) {
    const friendDetail = await db.select('*')
        .from('user')
        .where('user_id', '=', friend_id);

    return {
        user_id: friendDetail[0].user_id,
        name: friendDetail[0].name,
        contact_name: friendDetail[0].contact_name,
        image: friendDetail[0].image || '',
    }
}

module.exports = getFriend;