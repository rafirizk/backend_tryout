const mongoose = require('mongoose')
const {uri} = require('./../connection')
const User = require('../models/user')

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    if (err) {
        console.log(err)
    }else{
        console.log('connect mongo')
    }
})

class MongooseController{
    static get(req,res){
        User.find().then((result) => {
            res.send(result)
        }).catch((err) => {
            console.log(err)
        })
    }
}

module.exports = MongooseController