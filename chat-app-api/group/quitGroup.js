const db = require('../config.js');

async function quitGroup(req, res) {
    const { group_id, user_id } = req.body;

    let chat_id = await db.select('*').from('chat').where('group_id', '=', group_id);
    chat_id = chat_id[0].chat_id;

    if (group_id && user_id) {

        let admin_id = await db.select('*').from('group').where('group_id', '=', group_id);
        admin_id = admin_id[0].admin_id;

        if (admin_id === user_id) {
            let group_member = await db.select('*').from('user_chat')
                .where('chat_id', '=', chat_id)
                .andWhere('status', '=', true)
                .andWhere('user_id', '<>', user_id)

            let first_member = group_member[0]

            await db('group').where('group_id', '=', group_id)
                .update({ admin_id: first_member.user_id })
                .then(() => {
                    res.json({ status: 'success' })
                })
        }


        db('user_chat').where('chat_id', '=', chat_id).andWhere('user_id', '=', user_id)
            .update({ status: false })
            .then(() => {
                res.json({ status: 'success' })
            })


    }

    else {
        res.json({ status: "error" })
    }
}

module.exports = quitGroup;