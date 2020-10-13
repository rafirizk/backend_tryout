const MongoClient = require('mongodb').MongoClient
const {ObjectID} = require('mongodb')
const uri = 'mongodb+srv://rizk:kura1234@cluster0.bkarf.mongodb.net/sample_airbnb?retryWrites=true&w=majority'
// const client = new MongoClient(uri, {useUnifiedTopology: true})

module.exports = {
    getdata: (req, res) => {
        MongoClient.connect(uri, {useUnifiedTopology: true}, (err, client) => {
            if (err) {
                console.log(err)
            }
            const collection = client.db("store").collection("user")
            collection.find({nama: {"$regex": "ra", "$options": "i"}}).limit(4).project().toArray((err, result) => {
                if(err) {
                    console.log(err)  
                    return res.status(500).send(err)
                }
                res.send(result)
                // client.close()
            })
        })
    },
    adddata: (req, res) => {
        const data = req.body
        MongoClient.connect(uri, {useUnifiedTopology:true} , (err, client) => {
            const collection = client.db("store").collection("user")
            collection.insertMany(data, (err, result) => {
                if(err) {
                    return res.status(500).send(err)
                }
                res.send(result)
            })
        })
    },
    updatedata: (req, res) => {
        const data = req.body
        const {id} = req.params
        MongoClient.connect(uri, {useUnifiedTopology:true} , (err, client) => {
            const collection = client.db("store").collection("user")
            
        })
    }
}