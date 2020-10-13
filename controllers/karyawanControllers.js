const {db} = require('../connection')

module.exports = {
    getkaryawanbyid: (req,res) => {
        db.query(`SELECT * FROM employee WHERE No = ?`, [req.params.id], (err, results) => {
            if (err) return res.status(500).send(err)
            res.status(200).send(results)
        })
    },
    getAllKaryawan: (req, res) => {
        let {page} = req.query
        let sql = ''
        if (page) {
            page = parseInt(page)
            sql = `SELECT * FROM employee LIMIT ${page*5}, 5`
            // page 1 = 0, page 2 = 5
        }else {
            sql = 'SELECT * FROM employee'
        }
        db.query(sql, (err, results) => {
            if (err) {
                return res.status(500).send(err)
            }
            return res.status(200).send(results)
        })
    },
    postNewKaryawan: (req, res) => {
        var data = req.body
        var sql = 'INSERT INTO employee SET ?'
        db.query(sql, data, (err, results) => {
            if (err) {
                return res.status(500).send(err)
            }
            db.query('SELECT * FROM employee', (err, results) => {
                if (err) {
                    return res.status(500).send(err)
                }
                return res.status(200).send(results)
            })
        })
    },
    deleteKaryawan: (req, res) => {
        var sql = 'DELETE FROM employee WHERE No = ?'
        db.query(sql, [req.params.id], (err, results) => {
            if (err) return res.status(500).send(err)
            db.query('SELECT * FROM employee', (err, results) => {
                if (err) return res.status(500).send(err)
                return res.status(200).send(results)
            })
        })
    },
    editKaryawan: (req,res) => {
        let data = req.body
        let id = req.params.id
        let sql = 'UPDATE employee SET ? WHERE No = ?'
        db.query(sql, [data, id], (err, results) => {
            if (err) return res.status(500).send(err)
            db.query('SELECT * FROM employee', (err, results) => {
                if (err) return res.status(500).send(err)
                return res.status(200).send(results)
            })
        })
    }

}