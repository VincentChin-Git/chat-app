const db = require('../config.js');
const { DayName } = require('../utils/global_const');

const sortListBySendDatetime = (list) => {
    list.sort((a, b) => {
        const dateA = new Date(a.msgDate);
        const dateB = new Date(b.msgDate);
        return dateB - dateA; // sort in descending order (latest dates first)
    });
    return list;
}


async function getLastMessage(chat_id) {
    let lastMsgDb = await db.select('*').from('msg')
        .where('msg.chat_id', '=', chat_id)
        .andWhere('msg.status', '=', true)
        .join('user', 'msg.sender_id', '=', 'user.user_id')
        .orderBy('send_datetime', 'desc')

    let msg = '';
    let time = '';
    let msgDate = new Date('1970-01-01');
    if (lastMsgDb.length > 0) {
        msg = lastMsgDb[0].msg;
        let today = new Date();
        msgDate = new Date(lastMsgDb[0].send_datetime);

        // check if msgDate is today
        if (today.getFullYear() === msgDate.getFullYear() &&
            today.getMonth() === msgDate.getMonth() &&
            today.getDate() === msgDate.getDate()
        ) {
            let hours = msgDate.getHours().toString().padStart(2, '0');
            let minutes = msgDate.getMinutes().toString().padStart(2, '0');
            time = `${hours}:${minutes}`;
        }
        else {
            let differenceMs = Math.abs(msgDate.getTime() - today.getTime());
            let differenceDays = differenceMs / (1000 * 60 * 60 * 24);

            // yesterday
            if (differenceDays <= 1) {
                time = 'Yesterday';
            }

            // within one week
            else if (differenceDays > 1 && differenceDays < 7) {
                time = DayName[msgDate.getDay()]
            }

            // more than one week
            else {
                let day = msgDate.getDate().toString().padStart(2, '0');
                let month = (msgDate.getMonth() + 1).toString().padStart(2, '0');
                let year = msgDate.getFullYear().toString();

                time = `${day}/${month}/${year}`;
            }
        }
    }

    return { msg, time, msgDate }
}

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
                let { msg, time, msgDate } = await getLastMessage(chat_id)
                chat_details = [...chat_details, { name, image: `ProfileImage/${image}`, chat_id, msg, time, msgDate }]
            }

            // get group chat name if is group chat
            else if (chat.group_id > 0) {
                let { chat_id, group_id } = chat;
                let group = await db.select('*').from('group').where('group_id', '=', group_id);
                let { group_name, group_image } = group[0]
                let { msg, time, msgDate } = await getLastMessage(chat_id)

                chat_details = [...chat_details, { name: group_name, image: `GroupImage/${group_image}`, chat_id, msg, time, msgDate }]
            }
        }

        // chat_details = sortListBySendDatetime(chat_details)
        // console.log(chat_details)

        res.json({ status: 'success', chat_list: sortListBySendDatetime(chat_details) })

    }
    else {
        res.json({ status: 'error' })
    }
}

module.exports = getChatList;