const db = require('../config.js');

const getProfileImage = (req, res) => {
    const { user_id } = req.params;
    // res.json(req.body);
    if (user_id) {

        db.select('*')
            .from('user')
            .where('user_id', '=', user_id)
            .then((rows) => {
                if (rows.length > 0) {
                    let { image } = rows[0];
                    res.json({ status: 'success', image })
                }
            }).catch((error) => {
                console.error(error);
            });
    }
    else {
        res.json({ status: 'error' })
    }
}

module.exports = getProfileImage;