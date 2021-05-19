const query = require('./query')
function insertUser(email, password) {
  return query(`INSERT INTO user (email, password) VALUES (?, ?)`, [
    email,
    password,
  ])
}

function getUserFromEmailAndPassword(email, password) {
  return query(`SELECT * FROM user WHERE email = ? AND password = ?`, [
    email,
    password,
  ])
}

module.exports = {
  insertUser,
  getUserFromEmailAndPassword,
}
