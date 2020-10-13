const {db} = require('../connection')
const {Encrypt} = require('../helpers')
const nodemailer = require('nodemailer')
const {createJWToken} = require('../helpers/jwt')

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'rafirizkimaulana@gmail.com',
        pass: 'cfwpwbkxhxzwgllj'
    },
    tls: {
        rejectUnauthorized: false 
    }
})

module.exports = {
    register:(req, res) => {
        const {username, email, password} = req.body
        let hashPassword = Encrypt(password)
        let sql = 'SELECT * FROM users WHERE username = ?'
        db.query(sql, [username], (err, results) => {
            if (err) res.status(500).send(err)
            if (results.length){
                return res.status(500).send({message:'username sudah terpakai'})
            }else{
                let data = {
                    username,
                    email,
                    password: hashPassword,
                    lastlogin: new Date()
                }
                sql = 'INSERT INTO users set ?'
                db.query(sql, data, (err, results1) => {
                    if (err) res.status(500).send(err)
                    db.query('SELECT * FROM users where id = ?',results1.insertId, (err, userData) => {
                        if (err) res.status(500).send(err)
                        const token = createJWToken({id: userData[0].id, username: userData[0].username})
                        // tanpa token
                        // const link = `http://localhost:3000/verification?id=${userData[0].id}`
                        // dengan token
                        const link = `http://localhost:3000/verification?token=${token}`
                        transporter.sendMail({
                            from: 'rafi <rafirizkimaulana@gmail.com',
                            to: email,
                            subject: 'Hai',
                            html:`<a href=${link}>Klik Disini</a>`
                        }, (err) => {
                            if (err) return res.status(500).send({message:err.message})
                            res.status(200).send(userData[0])
                        })
                    })
                })
            }
        })
    },
    login: (req, res) => {
        const {username, password} = req.body
        let hashPassword = Encrypt(password)
        let sql = 'SELECT * FROM users WHERE username = ? AND password = ?'
        db.query(sql, [username, hashPassword], (err, userData) => {
            if (err) return res.status(500).send(err)
            if (!userData.length) {
                return res.status(500).send({message:'username atau password salah'})
            }
            sql = `UPDATE users SET ? WHERE id = ${db.escape(userData[0].id)}`
            let Editdata = {
                lastLogin: new Date()
            }
            db.query(sql, Editdata, (err) => {
                if (err) return res.status(500).send(err)
                const token = createJWToken({id: userData[0].id, username: userData[0].username})
                userData[0].token = token
                return res.send(userData[0])
            })
        }) 
    },
    verification: (req, res) => {
        const {id} = req.user
        let dataEdit ={
            isVerified: true
        }
        let sql = `UPDATE users SET ? WHERE id = ${db.escape(id)}`
        db.query(sql, dataEdit, (err) => {
            if (err) return res.status(500).send(err)
            sql = `SELECT * FROM users WHERE id = ${db.escape(id)}`
            db.query(sql, (err, results) => {
                if (err) return res.status(500).send(err)
                results[0].token = req.token
                res.send(results[0])
            })
        })
    },
    sendVerification: (req, res) => {
        const {email, id, username} = req.body
        const token = createJWToken({id: id, username: username})
        const link = `http://localhost:3000/verification?token=${token}`
        transporter.sendMail({
            from: 'rafi <rafirizkimaulana@gmail.com',
            to: email,
            subject: 'Hai confirm ulang yuk',
            html:`<a href=${link}>Klik Disini</a>`
        }), (err) => {
            if (err) return res.status(500).send({message:err.message})
            return res.send(true)
        }
    },
    keepLogin: (req, res) => {
        const  {id} = req.params
        db.query('SELECT * FROM users WHERE id = ?' [id], (err, userData) => {
            if (err) return res.status(500).send({message:err.message})
            const token = createJWToken({id: userData[0].id, username: userData[0].username})
            userData[0].token = token
            return res.send(userData[0])
        })
    }
}