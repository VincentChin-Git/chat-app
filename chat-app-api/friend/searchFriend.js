const db = require('../config.js');

async function searchFriend(req, res) {
    const { user_id, friend_name } = req.params;
    if (user_id) {

        // get name like friend name
        const user_list = await db.select('*')
            .from('user')
            .whereRaw('name like ? and status = ?', [`%${friend_name}%`, true])
            .orderBy('name', 'asc')
        const name_id_list = user_list.map(user => user.user_id);

        // // get user's friend
        const friend_list = await db.select('*')
            .from('friend_list')
            .whereRaw('(user_id1 = ? or user_id2 = ?) and status = ?', [user_id, user_id, true])

        const friend_id_list = friend_list.map(friend => {
            return friend.user_id1 === user_id ? friend.user_id2 : friend.user_id1
        })

        let id_list = [];
        for (let index = 0; index < name_id_list.length; index++) {
            if (friend_id_list.includes(name_id_list[index])) {
                id_list = [...id_list, name_id_list[index]]
            }
        }

        let result_list = []
        for (let index = 0; index < id_list.length; index++) {
            let user_db = await db.select('*').from('user').where('user_id', '=', id_list[index]).orderBy('name', 'desc')
            let result = {
                name: user_db[0].name,
                contact_no: user_db[0].contact_no,
                image: user_db[0].image,
                user_id: id_list[index]
            }
            result_list = [...result_list, result];
        }

        res.json({ status: 'success', result: result_list })

    }
    else {
        res.json({ status: 'error' })
    }
}

module.exports = searchFriend;