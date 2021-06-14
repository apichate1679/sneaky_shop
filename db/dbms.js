const mysql = require('mysql')

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'FronG12345A',
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
