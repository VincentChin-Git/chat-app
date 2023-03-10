const db = require('../config.js');
const md5 = require('md5')

const newProfile = (req, res) => {
    const { name, contact_no, password } = req.body;
    // res.json(req.body);
    if (name && contact_no && password) {
        const password_md5 = md5(password);

        db.select('*')
            .from('user')
            .where('contact_no', '=', contact_no)
            .andWhere('status', '=', true)
            .then((rows) => {
                if (rows.length > 0) {
                    res.json({ status: 'duplicate' })
                }
                else if (rows.length == 0) {
                    db('user').insert({ name, contact_no, password: password_md5 }).then(() => {
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

module.exports = newProfile;