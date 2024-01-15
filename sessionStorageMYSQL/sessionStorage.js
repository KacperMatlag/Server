const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const MysqlStorage = new MySQLStore({
    host: 'localhost',
    password: '',
    user: 'root',
    database: 'announcementdb',
    port: '3306',
    createDatabaseTable: true
})

module.exports = MysqlStorage;