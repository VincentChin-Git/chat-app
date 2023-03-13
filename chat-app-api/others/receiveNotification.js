const db = require('../config.js');

const receiveNotification = (req, res) => {
    const { user_id } = req.params;

    db.select('*').from('notification')
        .where('user_id', '=', user_id)
        .then(rows => {
            res.json(rows)
        })

}

module.exports = receiveNotification;