const db = require('../config.js');

async function getGroupMember(req, res) {
    const { group_id } = req.params;

    let chat_id = await db('chat').select('*').from('chat').where('group_id', '=', group_id);
    chat_id = chat_id[0].chat_id;

    let user_ids = await db('group').select('*').from('user_chat')
        .where('user_chat.chat_id', '=', chat_id)
        .andWhere('user_chat.status', '=', true)
        .join('user', 'user_chat.user_id', '=', 'user.user_id')

    users = user_ids.map(user => { return { user_id: user.user_id, name: user.name, contact_no: user.contact_no } })

    res.json({ status: 'success', users })
}

module.exports = getGroupMember;