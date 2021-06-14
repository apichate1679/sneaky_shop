const express = require('express')
const cookieParser = require('cookie-parser')
const http = require('http')
const https = require('https')
const fs = require('fs')

const config = require('./config')

const dbms = require('./db/dbms')
const userService = require('./service/user')
const cargoService = require('./service/cargo')

const app = express()

app.use('/', express.static('public'))
app.use('/uploads', express.static('uploads'))

const APIRouter = express.Router()

APIRouter.use(express.json())
APIRouter.use(express.urlencoded({ extended: false }))
APIRouter.use(cookieParser())

//================ user service =====================//

APIRouter.post('/register', userService.register)
APIRouter.post('/logout', userService.logout)
APIRouter.post('/login', userService.login)

//================ cargo service =====================//
APIRouter.use('/user', userService.loginPermissionMiddleware)
APIRouter.post(
  '/user/insertCargo',
  cargoService.cargoImageMiddleware,
  cargoService.insertCargo
)
APIRouter.get('/getAllCargo', cargoService.getAllCargo)
APIRouter.get('/getCargo', cargoService.getCargo)

app.use('/api', APIRouter)

dbms.createConnect()

if (config.ssl.enable) {
  const privateKey = fs.readFileSync(config.ssl.privateKeyPath, 'utf8')
  const certificate = fs.readFileSync(config.ssl.certificatePath, 'utf8')
  const ca = fs.readFileSync(config.ssl.chainFilePath, 'utf8')
  const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca,
  }
  const httpsServer = https.createServer(credentials, app)

  httpsServer.listen(443, () => {
    console.log('HTTPS Server running on port 443')
  })
} else {
  const httpServer = http.createServer(app)
  httpServer.listen(80, () => {
    console.log('HTTP Server running on port 80')
  })
}
