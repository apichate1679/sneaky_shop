const user = require('../db/user')

function logout(_, res) {
  res.clearCookie('email')
  res.clearCookie('userId')
  res.send({ status: 'success' })
}

async function login(req, res) {
  const { email, password } = req.body

  let result = await user.getUserFromEmailAndPassword(email, password)

  if (result.length != 1) return res.send({ status: 'fail' })

  res.cookie('email', email)
  res.cookie('userId', result[0].id)

  res.send({ status: 'success' })
}

async function register(req, res) {
  const { email, password, confirmPassword } = req.body
  if (password !== confirmPassword) {
    return res.send({ status: 'fail' })
  }

  await user.insertUser(email, password)

  return res.send({ status: 'success' })
}

function loginPermissionMiddleware(req, res, next) {
  if (typeof req.cookies.userId === 'undefined') {
    return res.send({ status: 'fail' })
  }
  next()
}

module.exports = {
  register,
  login,
  logout,
  loginPermissionMiddleware,
}
