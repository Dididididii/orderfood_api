const mysql = require('mysql')

const db = mysql.createPool({
  host: 'user.xuqiannet.top',
  port: 3306,
  user: 'gak0414',
  password: '1281627297',
  database: 'gak0414'
})

module.exports = db
