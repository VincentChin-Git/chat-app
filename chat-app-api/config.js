const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'vincent',
        password: '',
        database: 'chat_app',
    }
})

module.exports = db;