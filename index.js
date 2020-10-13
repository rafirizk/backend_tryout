const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const bearerToken = require('express-bearer-token')
const mongoose = require('mongoose')
const Crypto = require('crypto')
const http = require('http')
const socketIO = require('socket.io')
require('dotenv').config()
const User = require('./models/user')
const uri = 'mongodb+srv://rizk:kura1234@cluster0.bkarf.mongodb.net/store?retryWrites=true&w=majority'

app.use(cors())
app.use(bearerToken())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static('public'))
const server = http.createServer(app)
const io = socketIO(server)

const PORT = process.env.PORT || 5000

let arrMsg = []
let userCount = 0

app.io = io
app.arrMsg = arrMsg


const {
    ProductRoutes, 
    KaryawanRoutes, 
    AuthRoutes, 
    ProductsRoutes, 
    MongoRoutes, 
    MongooseRoutes,
    SocketRoutes
} = require('./routes')
const { disconnect } = require('process')

app.use('/products', ProductRoutes)
app.use('/karyawans', KaryawanRoutes)
app.use('/auth', AuthRoutes)
app.use('/prod', ProductsRoutes)
app.use('/mongo', MongoRoutes)
app.use('/mongoose', MongooseRoutes)
app.use('/socket', SocketRoutes)

io.on('connection', socket => {
    // userCount++
    userCount++
    socket.on('usercon',()=>{
        console.log('User connectedf')
        console.log(userCount)
        io.emit('user connected', userCount) //emit trigger pasangannya on
    })

    socket.on("tes",(data)=>{
        console.log(data)
    })

    socket.on('disconnect', () => {
      console.log('user disconnected')
      userCount--;
      io.emit('user connected', userCount)
    })
})

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    if (err) {
        console.log(err)
    }else{
        console.log('mongo connected')
    }
})

// app.get('/getmongo', (req,res) => {
//     User.find().then((result) => {
//         res.send(result)
//     }).catch((err) => {
//         console.log(err)
//     })
// })

app.post('/addmongo', (req,res) => {
    const {username, usia} = req.body
    User({
        username: username,
        usia: usia
    }).save().then((result) => {
        res.send(result)
    }).catch((err) => {
        console.log(err)
    })
})

app.put('/updatemongo/:id', (req, res) => {
    const {id} = req.params
    const {username} = req.body
    User.updateOne({_id: id}, {username:username})
    .then(result => {
        res.send(result)
    }).catch(err => {
        console.log(err)
    })
})

app.delete("/deletemongo/:id", (req,res) => {
    const {id} = req.params
    User.findByIdAndRemove(id)
    .then(result => {
        res.send(result)
    }).catch(err => {
        res.send(err)
    })
})

app.get('/',(req,res) => {
    res.status(200).send('Welcome')
})

app.get('/encrypt', (req, res) => {
    console.log(req.query.password)
    let password = req.query.password
    let hashPassword = Crypto.createHmac('sha256', 'rafi').update(password).digest('hex')
    res.send({
        passwordBefore: password,
        passwordAfter: hashPassword,
        passwordLength: hashPassword.length
    })
})

app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id)
    res.status(200).send({
        id: id
    })
})

app.post('/users', (req, res) => {
    console.log(req.body)

    res.status(200).send(req.body)
})

app.get('/users', (req, res) => {
    res.status(200).send('abc')
})

app.get('*', (req,res) => {
    res.send('404 NOT FOUND!')
})

server.listen(PORT, () => {
    console.log('API activated, Port: 5000')
})