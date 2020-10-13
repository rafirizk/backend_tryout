const Router=require('express').Router()
const {SocketController} = require('./../controllers')

Router.get('/getdata',SocketController.getMessages)
Router.post('/senddata',SocketController.sendMessage)
Router.delete('/clearmessages',SocketController.clearMessages)


module.exports=Router