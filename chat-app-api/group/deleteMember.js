const db = require('../config.js');

async function deleteMember(req, res) {
    const { group_id, deleted_id, admin_id } = req.body;
    // res.json(req.body)

    if (group_id && deleted_id && admin_id) {

        let verify_group = await db.select('*')
            .from('group')
            .where('admin_id', '=', admin_id)
            .andWhere('group_id', '=', group_id)
            .andWhere('status', '=', true);

        let chat_id = await db.select('*').from('chat').where('group_id', '=', group_id);
        chat_id = chat_id[0].chat_id;

        let verify_user = await db.select('*')
            .from('user_chat')
            .where('user_id', '=', deleted_id)
            .andWhere('chat_id', '=', chat_id)
            .andWhere('status', '=', true);

        if (verify_group.length > 0 && verify_user.length > 0) {
            db('user_chat').where('user_id', '=', deleted_id).andWhere('chat_id', '=', chat_id)
                .update({ status: false })
                .then(() => {
                    res.json({ status: 'success' })
                })
        }
        else {
            res.json({ status: "error" })
        }
    }

    else {
        res.json({ status: "error" })
    }
}

module.exports = deleteMember;