const db = require('../util/db');
const User = require('../model/User');
class UserService {

    static getUsers(id) {
        var connection;
        return new Promise((resolve, reject) => {
            db.getConnection().
                then(conn => {
                    connection = conn;
                    connection.query('select * from User ', (err, results) => {
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

    static editUser(id, data) {
        var connection;
        return new Promise((resolve, reject) => {
            db.getConnection().
                then(conn => {
                    connection = conn;
                    return db.beginTransaction(conn);
                }).then(() => {
                    // update isActive 
                    return new Promise((res, rej)=>{
                    connection.query('Update User SET isActive = 0, updatedAt =?, updatedBy= ?  WHERE userId = ?',
                        [data.updatedAt, data.updatedBy, id], (err, results) => {
                            if (err) {
                                db.rollbackTransaction(connection);
                                db.releaseConnection(connection);
                                console.log("--error---",err);
                                reject(err);
                            } else {
                                res();
                            }
                        })
                    })
                }).then(() => {
                    // Insert Record
                    let updatedData = {
                        firstName : data.firstName,
                        lastName    :data.lastName,
                        email : data.email,
                        password : data.password,
                        role  : data.role,
                        isActive : 1,
                        status : data.status,
                        createdAt  : data.createdAt,
                        updatedAt : data.updatedAt,
                        createdBy : data.createdBy,
                        updatedBy : data.updatedBy
                    }
                    connection.query('INSERT INTO User SET ?',
                        [updatedData], (err, results) => {
                            if (err) {
                                db.rollbackTransaction(connection);
                                db.releaseConnection(connection);
                                console.log("--error---",err);
                                reject(err)
                            } else {
                                db.commitTransaction(connection);
                                db.releaseConnection(connection);
                                resolve(results);
                            }
                        })
                })
                .catch(err => {
                    console.log(err);
                    reject(err);
                })
        });

    }

    
    static deleteUser(id) {
        var connection;
        return new Promise((resolve, reject) => {
            db.getConnection().
                then(conn => {
                    connection = conn;
                    connection.query('delete from User  WHERE userId = ? ',[id], (err, results) => {
                        db.releaseConnection(connection);
                        if (err) {
                            reject(err)
                        } else {
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
        var connection;
        return new Promise((resolve, reject) => {
            db.getConnection().
                then(conn => {
                    connection = conn;
                    //occupation['createdBy'] = user;
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
                            // UserService.getUserById(result.insertId).then( user => {
                            //     resolve(user);
                            // })                       
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
        return new Promise((resolve, reject) => {
            db.getConnection().
                then(conn => {
                    connection = conn;
                    connection.query(`select * from User where email = ? and password = ? `, [email, password], (err, results) => {
                        db.releaseConnection(connection);
                        if (err) {
                            console.log(err)
                            reject(err)
                        } else {
                            if (results.length == 0) {
                                console.log("INVALID_USER");
                                resolve("INVALID_USER")
                            } else {
                               resolve(results);
                                // UserService.getUserById(results[0].userId).then(user => {
                                //     resolve(user);
                                // })
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