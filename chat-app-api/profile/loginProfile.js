const db = require('../config.js');
const md5 = require('md5')

async function loginProfile(req, res) {
    const { contact_no, password } = req.body;
    // res.json(req.body);
    if (contact_no && password) {
        const password_md5 = md5(password);

        let userDb = await db.select('*')
            .from('user')
            .where('contact_no', '=', contact_no)
            .andWhere('password', '=', password_md5)
            .andWhere('status', '=', true);

        if (userDb.length > 0) {
            let { user_id, name, image } = userDb[0];
            let data = { user_id, name, profile_image: image };

            await db('user').where('user_id', '=', user_id)
                .update({ last_login: new Date() })
            res.json({ status: 'success', data })
        }
        else {
            res.json({ status: 'error' })
        }
    }
    else {
        res.json({ status: 'error' })
    }
}

module.exports = loginProfile;