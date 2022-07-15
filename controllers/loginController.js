const pool = require("../db");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.login = (req, res) => {
    let {
        user_name,
        password
    } = req.body
    // console.log({user_name, password, body: req.body})
    try{
        pool.query('SELECT * FROM users WHERE user_name = $1', [user_name], (error, results) => {
            if (error) {
              throw error;
            }
            console.log(results.rows[0].password)
            if(results.length === 1){
                bcrypt.compare(password, results.rows[0].password, (err, isMatch) => {
                    if(err) throw err;
                    console.log(isMatch)
                    if(isMatch){
                        const token = jwt.sign(
                            {
                                user_id: results[0].user_id
                            },
                            "secretkey",
                            {expiresIn: 60 * 300}
                        )

                        res.status(200).json({
                            "status_code": 200,
                            "data": {token},
                            error_messages: ""
                        });
                    }
                    else{
                        res.status(403).json({
                            "status_code": 403,
                            "data": "",
                            error_messages: "Wrong password"
                        });
                    }
                })
            }
            else {
                res.status(400).json({
                    "status_code": 400,
                    "data": "",
                    error_messages: "Bad Request"
                })
            }
          })
    }catch(err){
        res.status(400).json({
            "status_code": 400,
            "data": "",
            error_messages: "Bad Request"
        })
    }
}