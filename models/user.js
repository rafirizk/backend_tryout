const mongoose  = require('mongoose')

const Schema = mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    usia: {
        type: Number,
        required: true
    },
    datein:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("user", Schema)