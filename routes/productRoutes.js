const Router = require('express').Router()


const database = [
    {
        id: 1,
        name: 'popok ABC',
        desc: 'susu segar yang alami',
        price: 20000
    },
    {
        id: 2,
        name: 'popok asd',
        desc: 'biskuit manis nan renyah',
        price: 15000
    },
    {
        id: 3,
        name: 'popokJKL',
        desc: 'lotion yang dapat melembabkan kulit',
        price: 35000
    }
]

Router.get('/', (req, res) => {
    let {name, minPrice, maxPrice} = req.query
    if (name || minPrice || maxPrice){
        let filterData = database.filter(val =>{
            let name1 = true;
            let minPrice1 = true;
            let maxPrice1 = true;
            if (name) {
                name1 = val.name.toLowerCase().includes(name.toLowerCase())
            }
            if (minPrice) {
                minPrice1 = val.price >= minPrice
            }
            if (maxPrice) {
                maxPrice1 = val.price <= maxPrice
            }
            return name1 && minPrice1 && maxPrice1
        });
        res.status(200).send(filterData);
    }else{
        res.status(200).send(database);
    }
})

Router.post('/', (req, res) => {
    var {name, desc,price} = req.body;
    if (name && desc && price ){
        database.push(
            {
                id: database.length + 1,
                name,
                price,
                desc
            }
        )
        res.status(200).send(database)
    }else {
        res.status(300).send('data is not valid')
    }
})

Router.put('/:id', (req, res) => {
    let {id} = req.params
    let index = database.findIndex((val) => val.id === parseInt(id))
    database[index] = {...database[index],...req.body}
    res.send(database)
})

Router.delete('/:id', (req, res) => {
    let {id} = req.params
    let index = database.findIndex((val) => val.id === parseInt(id))
    database.splice(index, 1)
    res.send(database)
})

module.exports = Router