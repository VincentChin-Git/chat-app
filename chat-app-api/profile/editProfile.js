const db = require('../config.js');

const editProfile = (req, res) => {
    const { user_id, name, contact_no } = req.body;
    if (user_id && name && contact_no) {
        db.select('*')
            .from('user').where('contact_no', '=', contact_no)
            .andWhere('user_id', '<>', user_id)
            .then((rows) => {
                if (rows.length > 0) {
                    res.json({ status: 'duplicate' })
                }
                else if (rows.length === 0) {
                    db('user').where({ user_id, status: true })
                        .update({ name, contact_no })
                        .then(() => {
                            res.json({ status: 'success' })
                        }).catch((error) => {
                            console.error(error);
                        });
                }
            }).catch((error) => {
                console.error(error);
            });


    }
    else {
        res.json({ status: 'error' })
    }
}

module.exports = editProfile;