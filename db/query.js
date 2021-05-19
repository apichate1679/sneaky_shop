const dbms = require('./dbms')
module.exports = (sql, arg) => {
  return new Promise((resolve, reject) => {
    dbms.connection.query(sql, arg, (err, result, fields) => {
      if (err) reject(err)
      else resolve(result)
    })
  })
}
