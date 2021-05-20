const multer = require('multer')
const cargo = require('../db/cargo')
const stringFormat = require('../util/stringFormat')

const cargoImageMiddleware = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '.' + file.mimetype.split('/').pop())
    },
  }),
}).single('image')

async function insertCargo(req, res) {
  const { name, price } = req.body
  const { file } = req
  const result = await cargo.insertCargo(name, Number(price), file.filename)
  res.send({
    status: 'success',
    result: {
      fileName: file.filename,
    },
  })
}

async function getAllCargo(req, res) {
  const result = await cargo.getALLCargo()
  res.send({
    status: 'success',
    result: result.map(c => ({
      ...c,
      price: stringFormat.numberWithCommas(c.price),
    })),
  })
}

async function getCargo(req, res) {
  const { cargo_id } = req.query
  const result = await cargo.getCargo(Number(cargo_id))

  if (result.length !== 1) {
    return res.send({ status: 'fail' })
  }

  return res.send({
    status: 'success',
    result: {
      ...result[0],
      price: stringFormat.numberWithCommas(result[0].price),
    },
  })
}

module.exports = {
  cargoImageMiddleware,
  insertCargo,
  getAllCargo,
  getCargo,
}
