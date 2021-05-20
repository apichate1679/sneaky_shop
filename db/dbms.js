const mysql = require('mysql')

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'shop',
  port: '3306',
})

const connect = () =>
  new Promise(resolve => {
    con.connect(err => {
      if (err) throw err
      resolve()
    })
  })

module.exports = {
  createConnect: connect,
  connection: con,
}
