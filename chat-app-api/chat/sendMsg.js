const db = require('../config.js');

async function sendMsg(req, res) {
    const { user_id, chat_id, msg, friend_id } = req.body;
    if (user_id && msg) {

        // send msg to existing chat
        if (chat_id) {
            let msg_id = await db('msg').insert({
                chat_id,
                sender_id: user_id,
                msg: msg,
            }).returning('msg_id');
            msg_id = msg_id[0].msg_id

            const user_list = await db.select('*').from('user_chat').where('chat_id', '=', chat_id).andWhere('status', '=', true).andWhere('user_id', '<>', user_id);
            const user_id_list = user_list.map(user => user.user_id);
            user_id_list.forEach(recipient => {
                db('notification').insert({ chat_id, user_id: recipient, msg_id })
            })

            res.json({ status: 'success' })
        }

        // new chat
        else if (friend_id) {
            // create new chat
            let chat_id = await db('chat').insert({}).returning('chat_id');
            chat_id = chat_id[0].chat_id

            // send msg
            let msg_id = await db('msg').insert({
                chat_id,
                sender_id: user_id,
                msg: msg,
            }).returning('msg_id');
            msg_id = msg_id[0].msg_id

            // link chat with two user
            db('user_chat').insert({
                chat_id,
                user_id: user_id,
            }).catch(err => { console.log('user', err) })

            db('user_chat').insert({
                chat_id,
                user_id: friend_id,
            }).catch(err => { console.log('friend', err) })

            // create notification
            db('notification').insert({
                chat_id, msg_id, user_id: friend_id
            }).then(() => {
                res.json({ status: 'success' })
            }).catch(err => { console.log('notification', err) })


        }

        else {
            res.json({ status: 'error' })
        }
    }
    else {
        res.json({ status: 'error' })
    }
}

module.exports = sendMsg;