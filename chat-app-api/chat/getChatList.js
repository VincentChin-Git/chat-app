const db = require('../config.js');

async function getChatList(req, res) {
    const { user_id } = req.params;
    if (user_id) {

        const chat_list = await db.select('*')
            .from('user_chat')
            .where('user_chat.user_id', '=', user_id)
            .andWhere('user_chat.status', '=', true)
            .join('chat', 'chat.chat_id', '=', 'user_chat.chat_id')
            .orderBy('user_chat.pinned', 'desc');

        let chat_details = [];
        for (let index = 0; index < chat_list.length; index++) {
            let chat = chat_list[index];


            // get friend name if not group chat
            if (chat.group_id === 0) {
                let chat_id = chat.chat_id;
                let user = await db.select('*')
                    .from('user_chat')
                    .where('user_chat.user_id', '<>', user_id)
                    .andWhere('user_chat.chat_id', '=', chat_id)
                    .join('user', 'user.user_id', '=', 'user_chat.user_id');
                let { name, image } = user[0];
                chat_details = [...chat_details, { name, image, chat_id }]
            }

            // get group chat name if is group chat
            else if (chat.group_id > 0) {
                let { chat_id, group_id } = chat;
                let group = await db.select('*').from('group').where('group_id', '=', group_id);
                let { group_name, group_image } = group[0]
                chat_details = [...chat_details, { name: group_name, image: group_image, chat_id }]
            }
        }

        res.json({ status: 'success', chat_list: chat_details })

    }
    else {
        res.json({ status: 'error' })
    }
}

module.exports = getChatList;