const query = require('./query')

function insertCargo(name, price, image) {
  return query(`INSERT INTO cargo (name, price, image) VALUES (?, ?, ?)`, [
    name,
    price,
    image,
  ])
}

function getALLCargo() {
  return query(`SELECT * FROM cargo`, [])
}

function getCargo(id) {
  return query(`SELECT * FROM cargo WHERE cargo_id = ${id}`, [])
}

module.exports = {
  getALLCargo,
  insertCargo,
  getCargo,
}
