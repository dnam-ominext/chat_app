const pool = require("../db");
const bcrypt = require('bcrypt');
const uniqid = require('uniqid');

module.exports.register = (req, res) => {
    let {
        user_name, 
        password
    } = req.body

    try{
        bcrypt.hash(password, 10, (err, hash) => {
            pool.query(
                `INSERT INTO users(user_id, user_name, password)
                VALUES ($1, $2, $3)
                RETURNING *
                `,
                [uniqid(), user_name, hash],
                (err, results, fields) => {
                    if(err) throw err;
                    res.status(200).json({
                        "status_code": 201,
                        "data": {
                            "user_name": user_name,
                            "password": hash
                        },
                        error_messages: ""
                    })
                }
            )
        })
    }catch(err){
        res.status(400).json({
            "status_code": 400,
            "data": "",
            error_messages: "Bad Request"
        })
    }
}