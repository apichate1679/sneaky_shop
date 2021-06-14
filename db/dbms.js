const mysql = require('mysql')
const config = require('../config')

const con = mysql.createConnection(config.db)

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
