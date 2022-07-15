const Pool = require('pg').Pool

const pool = new Pool({
    user: "postgres",
    password: "Ngangiang@257",
    host: "localhost",
    port: 5432,
    database: "app_chat"
})

module.exports = pool;