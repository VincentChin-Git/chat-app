const db = require('../config.js');

async function getChat(req, res) {
    const { user_id, chat_id } = req.params;
    // res.json(req.body);
    if (user_id && chat_id) {

        let msg_list = await db.select('*')
            .from('msg')
            .where('msg.chat_id', '=', chat_id)
            .andWhere('msg.status', '=', true)
            .join('user', 'user.user_id', '=', 'msg.sender_id');

        msg_list = msg_list.map(msg_elem => {
            let { msg_id, msg, send_datetime, name } = msg_elem
            let datetime = new Date(send_datetime);
            let date = datetime.getFullYear() + '-' + (datetime.getMonth() + 1) + '-' + datetime.getDate();
            let time = datetime.getHours() + ':' + datetime.getMinutes();

            return {
                msg_id, msg, date, time, name
            }
        })

        res.json({ status: 'success', msg_list })

    }
    else {
        res.json({ status: 'error' })
    }
}

module.exports = getChat;