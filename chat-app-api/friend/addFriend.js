const db = require('../config.js');

const newProfile = (req, res) => {
    const { user_id, added_contact_no } = req.body;
    if (user_id && added_contact_no) {

        // check is valid user
        db.select('*')
            .from('user')
            .where('contact_no', '=', added_contact_no)
            .andWhere('user_id', '<>', user_id)
            .andWhere('status', '=', true)
            .then((rows) => {
                if (rows.length === 0) {
                    res.json({ status: 'not found' })
                }
                else if (rows.length > 0) {
                    const friend_id = rows[0].user_id

                    // check exist friendship
                    db.select('*')
                        .from('friend_list')
                        .where('user_id1', '=', user_id)
                        .andWhere('user_id2', '=', friend_id)
                        .andWhere('status', '=', true)
                        .then(rows_2 => {
                            if (rows_2.length === 0) {

                                // add request
                                db('friend_list').insert({ user_id1: user_id, user_id2: friend_id }).then(() => {
                                    res.json({ status: 'success' })
                                }).catch((error) => {
                                    console.error(error);
                                });
                            }
                            else {
                                const friendship = rows_2[0];
                                if (friendship.is_friend === 'pending') {
                                    res.json({ status: 'pending' })
                                }
                                else if (friendship.is_friend === 'friend') {
                                    res.json({ status: 'friend' })
                                }
                            }
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