const db = require('../util/db');
const User = require('../model/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;

class UserService {

    static getUsers(query) {
        let firstName = query.firstName;
        let lastName = query.lastName;
        let email = query.email;
        let role = query.role;

        let roleKey = "";
        if (role == "Management") {
            roleKey = 2;
        }
        if (role == "Internal Employee") {
            roleKey = 3;
        }
        if (role == "External Employee") {
            roleKey = 4;
        }
        if (role == "Client") {
            roleKey = 5;
        }

        var connection;
        return new Promise((resolve, reject) => {
            db.getConnection().
                then(conn => {
                    connection = conn;
                    connection.query('select * from User WHERE isActive= 1 AND  (role = ? OR firstName LIKE ? OR lastName LIKE ? OR email LIKE ?) ',
                        [roleKey, "%" + firstName + "%", "%" + lastName + "%", "%" + email + "%"], (err, results) => {
                            db.releaseConnection(connection);
                            if (err) {
                                reject(err)
                            } else {
                                // resolve( new User(results[0]))
                                resolve(results);
                            }
                        })
                })
                .catch(err => {
                    reject(err);
                })
        });

    }
    static addUser(data) {
        var salt = bcrypt.genSaltSync(saltRounds);
        var hash = bcrypt.hashSync(data.password, salt);
        data.password =hash;
        console.log("---hash paswro---",data);
        var connection;
        return new Promise((resolve, reject) => {
            db.getConnection().
                then(conn => {
                    connection = conn;
                    return new Promise((res, rej)=>{
                    connection.query(`Select email from User `, (err, result) => {
                        // db.releaseConnection(connection);
                        if (err) {
                            db.releaseConnection(connection);
                            reject(err);
                        } else {
                            let count = 0;
                            result.map(dt=>{
                                if(dt.email == data.email){
                                    count = count + 1;
                                }
                            })

                            if (!count) {
                                res();
                            } else {
                                db.releaseConnection(connection);
                                resolve("USER_ALREADY_REGISTERED");
                            }
                        }
                    })
                })
                }).then(() => {
                    connection.query(`INSERT INTO User SET ?`, [data], (err, result) => {
                        db.releaseConnection(connection);
                        if (err) {
                            console.log("error  of api", err.code)
                            if (err.code == "ER_DUP_ENTRY") {
                                resolve("USER_ALREADY_REGISTERED")
                                console.log("dublicate errror----");
                            }
                            reject(err)
                        } else {
                            console.log("--user Created----");
                            resolve(result);
                        }
                    })
                })
                .catch(err => {
                    reject(err);
                })
        });

    }

    static authUser(data) {
        var connection;
        var email = data.email;
        var password = data.password;
        //  let pass = bcrypt.compareSync(payload.password, rows[0].password);
        
        // var salt = bcrypt.genSaltSync(saltRounds);
        // var bcryptPassword = bcrypt.hashSync(data.password, salt);

        return new Promise((resolve, reject) => {
            db.getConnection().
                then(conn => {
                    connection = conn;
                    //occupation['createdBy'] = user;
                    connection.query(`select userId from User where email = ? and password = ? `, [email, password], (err, results) => {
                        db.releaseConnection(connection);
                        if (err) {
                            console.log(err)
                            reject(err)
                        } else {
                            if (results.length == 0) {
                                resolve("INVALID_USER")
                            } else {
                                UserService.getUserById(results[0].userId).then(user => {
                                    resolve(user);
                                })
                            }
                        }
                    })
                })
                .catch(err => {
                    reject(err);
                })
        });
    }

}

module.exports = UserService;