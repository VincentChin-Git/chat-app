const db = require('../config.js');
const md5 = require('md5')

const loginProfile = (req, res) => {
    const { contact_no, password } = req.body;
    // res.json(req.body);
    if (contact_no && password) {
        const password_md5 = md5(password);

        db.select('*')
            .from('user')
            .where('contact_no', '=', contact_no)
            .andWhere('password', '=', password_md5)
            .andWhere('status', '=', true)
            .then((rows) => {
                if (rows.length > 0) {
                    let { user_id, name } = rows[0];
                    let data = { user_id, name };
                    res.json({ status: 'success', data })
                }
            }).catch((error) => {
                console.error(error);
            });
    }
    else {
        res.json({ status: 'error' })
    }
}

module.exports = loginProfile;