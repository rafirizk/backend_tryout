const {uploader} = require('../helpers/uploader')
const fs = require('fs')
const {db}=require("./../connection")

module.exports = {
    Addphoto: (req, res) => {
        try {
            const path = '/foto'
            const upload = uploader(path, 'TES').fields([{name: 'image'}])
            
            upload(req,res, (err) => {
                console.log('test2')
                if(err){
                    return res.status(500).json({message: 'upload picture failed', error:err.message})
                }
                console.log('berhasil upload')
                const {image} = req.files;
                const imagePath = image ? path + '/' + image[0].filename : null
                const data = JSON.parse(req.body.data)
                data.image = imagePath
                console.log(data)
                db.query('INSERT INTO product SET ?', data, (err) =>{
                    if(err) {
                        if(imagePath){
                            fs.unlinkSync('./public'+imagePath)
                        }
                        return res.status(500).send(err)
                    }
                    return res.status(200).send('sucess upload')
                })
            })
        } catch (error) {
            console.log(error)
            return res.status(501).send(error)
        }
    },
    getAllProd: (req, res) => {
        let sql='SELECT * FROM product'
        db.query(sql, (err, productData) => {
            if (err) return res.status(500).send(err)
            return res.status(200).send(productData)
        })
    },
    deleteProd: (req, res) => {
        const {id} = req.params
        let sql = `SELECT * FROM product WHERE id = ${db.escape(id)}`
        db.query(sql, (err, productData) => {
            if (err) return res.status(500).send(err)
            if (productData.length) {
                console.log('abc')
                sql = 'DELETE FROM product WHERE id = ?'
                db.query(sql, id, (err) => {
                    if (err) return res.status(500).send(err)
                    if (productData[0].image){
                        fs.unlinkSync('./public' + productData[0].image)
                    }
                    sql = 'SELECT * FROM product'
                    db.query(sql, (err, productData1) => {
                        if (err) return res.status(500).send(err)
                        return res.status(200).send(productData1)
                    })
                })
            }else {
                if (err) return res.status(500).send('product tidak ada')
            }
        })
    },
    editProd: (req, res) => {
        const {id} = req.params
        let sql='SELECT * FROM product WHERE id = ?'
        db.query(sql, id, (err, productData) => {
            if (err) return res.status(500).send(err)
            if (productData.length) {
                try {
                    const path = '/foto'
                    const upload = uploader(path, 'TES').fields([{name: 'image'}])
                    upload(req,res, (err) => {
                        if(err){
                            return res.status(500).json({message: 'upload picture failed', error:err.message})
                        }
                        console.log('berhasil upload edit')
                        const {image} = req.files;
                        const imagePath = image ? path + '/' + image[0].filename : null
                        const data = JSON.parse(req.body.data)
                        if (imagePath) {
                            data.image = imagePath
                        }
                        db.query('UPDATE product SET ? WHERE id = ?', [data, id], (err) =>{
                            if(err) {
                                if(imagePath){
                                    fs.unlinkSync('./public' + imagePath)
                                }
                                return res.status(500).send(err)
                            }
                            if (imagePath) {
                                if(productData[0].image){
                                    fs.unlinkSync('./public' + productData[0].image)
                                }
                            }
                            sql = 'SELECT * FROM product'
                            db.query(sql, (err, productData) => {
                                if (err) return res.status(500).send(err)
                                return res.status(200).send(productData)
                            })
                        })
                    })
                } catch (error) {
                    return res.status(500).send(error)
                }
            } else {
                return res.status(500).send('error')
            }
        })
    }
}