const db = require('../config.js');

const editGroupName = (req, res) => {
    const { admin_id, group_id, group_name  } = req.body;
    if (admin_id && group_id && group_name) {
        db('group').where({ admin_id, group_id })
            .update({ group_name })
            .then(() => {
                res.json({ status: 'success' })
            }).catch((error) => {
                console.error(error);
            });
    }
    else {
        res.json({ status: 'error' })
    }
}

module.exports = editGroupName;
