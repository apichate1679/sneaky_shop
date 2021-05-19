const express = require('express')
const cookieParser = require('cookie-parser')

const dbms = require('./db/dbms')
const userService = require('./service/user')
const cargoService = require('./service/cargo')

const app = express()

const hostname = 'localhost'
const port = 3001

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
app.listen(port, hostname, () => {
  console.log(`Server running at   http://${hostname}:${port}`)
})
