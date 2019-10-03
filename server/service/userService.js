const db = require('../util/db');
const User = require('../model/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;

class UserService {

    static getUserList(offset) {
        var connection;
        return new Promise((resolve, reject) => {
            db.getConnection().then(conn => {
                connection = conn;
                return new Promise((res, rej) => {
                connection.query('SELECT COUNT(*) as COUNT FROM user WHERE isActive=1', (err, results) => {
                    if (err) {
                        db.releaseConnection(connection);
                        rej(err)
                    } else {
                        res(results[0].COUNT);
                    }
                })
            }).then(count => {
                    connection.query('Select * from User WHERE isActive = 1 LIMIT ?,10',[offset], (err, results) => {
                        db.releaseConnection(connection);
                        if (err) {
                            reject(err)
                        } else {
                            let finalRes={
                                "count" : count,
                                "result" : results
                            };

                            resolve(finalRes);
                        }
                    })
                })
            })
                .catch(err => {
                    db.releaseConnection(connection);
                    reject(err);
                })
        });

    }


    static getUserForSuggestions() {
        var connection;
        return new Promise((resolve, reject) => {
            db.getConnection().then(conn => {
                connection = conn;
                    connection.query('Select * from User WHERE isActive = 1 ', (err, results) => {
                        db.releaseConnection(connection);
                        if (err) {
                            reject(err)
                        } else {
                            resolve(results);
                        }
                    })
                })
            })
                .catch(err => {
                    db.releaseConnection(connection);
                    reject(err);
                })
    }

    static getUsers(query) {
        let firstName = query.firstName;
        let lastName = query.lastName;
        let email = query.email;
        let role = query.role;

        // let roleKey = "";
        // if (role == "Management") {
        //     roleKey = 2;
        // }
        // if (role == "Internal Employee") {
        //     roleKey = 3;
        // }
        // if (role == "External Employee") {
        //     roleKey = 4;
        // }
        // if (role == "Client") {
        //     roleKey = 5;
        // }

        var connection;
        return new Promise((resolve, reject) => {
            db.getConnection().
                then(conn => {
                    connection = conn;
                    connection.query('select * from User WHERE isActive= 1 AND (role LIKE  ? AND firstName LIKE ? AND lastName LIKE ? AND email LIKE ?) ',
                        ["%"+role+ "%", "%" + firstName + "%", "%" + lastName + "%", "%" + email + "%"], (err, results) => {
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
                    db.releaseConnection(connection);
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
                    return new Promise((res, rej) => {

                        connection.query('Update User SET isActive = 0, updatedAt =?, updatedBy= ?  WHERE userId = ?',
                            [new Date(), data.userId, id], (err, results) => {
                                if (err) {
                                    db.rollbackTransaction(connection);
                                    db.releaseConnection(connection);
                                    reject(err);
                                } else {
                                    res();
                                }
                            })
                    })
                }).then(() => {
                    // Insert Record
                    let updatedData = {
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email,
                        password: data.password,
                        role: data.role,
                        isActive: 1,
                        status: data.status,
                    }
                    updatedData = db.addAttributesForNew(updatedData, data.userId);
                    delete data.userId;
                    connection.query('INSERT INTO User SET ?',
                        [updatedData], (err, results) => {
                            if (err) {
                                db.rollbackTransaction(connection);
                                db.releaseConnection(connection);
                                reject(err)
                            } else {
                                db.commitTransaction(connection);
                                db.releaseConnection(connection);
                                resolve(results);
                            }
                        })
                })
                .catch(err => {
                    db.releaseConnection(connection);
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
                    connection.query('update user SET isActive = 0 WHERE userId = ? AND isActive = 1', [id], (err, results) => {
                        db.releaseConnection(connection);
                        if (err) {
                            reject(err)
                        } else {
                            resolve(results);
                        }
                    })
                })
                .catch(err => {
                    db.releaseConnection(connection);
                    reject(err);
                })
        });

    }
    
    static updateUserProfile(data) {
        var connection;
        return new Promise((resolve, reject) => {
            db.getConnection()
                .then((conn) => {
                    connection = conn;
                    return db.beginTransaction(connection);
                }).then(() => {
                    return new Promise((res, rej) => {
                        connection.query(`SELECT * FROM user  WHERE userId =? AND isActive = 1 `, [data.userId], (err, result) => {
                            if (err) {
                                db.rollbackTransaction(connection);
                                db.releaseConnection(connection);
                                reject(err)
                            } else {
                                res(result[0].password);
                            }
                        }) 
                    })
                })
                .then((password) => {
                    data["password"] = password;
                    return new Promise((res, rej) => {
                            connection.query(`UPDATE user SET isActive = 0, updatedBy= ?  WHERE userId =? AND isActive = 1 AND email = ? `, [data.updatedBy,data.userId, data.email], (err, result) => {
                                if (err) {
                                    db.rollbackTransaction(connection);
                                    db.releaseConnection(connection);
                                    reject(err)
                                } else {
                                    res();
                                }
                            })
                        })
                })
                .then(() => {
                    return new Promise((resSelect, rejSelect) => {
                        connection.query(`INSERT INTO user SET ?  `, [data], (err, result) => {
                            if (err) {
                                db.rollbackTransaction(connection);
                                db.releaseConnection(connection);
                                reject(err)
                            } else {
                                db.commitTransaction(connection);
                                resSelect();
    
                            }
                        })
                    })
                   
                }).then(()=> {
                        connection.query(`SELECT * FROM user  WHERE userId =? AND isActive = 1 `, [data.userId], (err, result) => {
                            if (err) {
                                db.rollbackTransaction(connection);
                                db.releaseConnection(connection);
                                reject(err)
                            } else {
                               
                                db.releaseConnection(connection);
                                resolve(result);
                            }
                        }) 
                    })
            
                .catch(err => {
                    reject(err);
                })
        });

    }

    static getUserId() {
        return new Promise((resolve, reject) => {
            var length = 20;
            var result = '';
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            resolve(result);
        })
    }
    
    static addUser(data) {
        var salt = bcrypt.genSaltSync(saltRounds);
        var hash = bcrypt.hashSync(data.password, salt);
        data.password = hash;
        var connection;
        return new Promise((resolve, reject) => {
            db.getConnection().
                then(conn => {
                    connection = conn;
                    return new Promise((res, rej) => {
                        connection.query(`Select email from User `, (err, result) => {
                            if (err) {
                                db.releaseConnection(connection);
                                reject(err);
                            } else {
                                let count = 0;
                                result.map(dt => {
                                    if (dt.email == data.email) {
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
                })
                .then(()=>{
                    return UserService.getUserId();
                })
                .then((uniqueId) => {
                    data["userId"] = uniqueId;
                    data = db.addAttributesForNew(data, data.userId);
                    // delete data.userId;
                    connection.query(`INSERT INTO User SET ?`, [data], (err, result) => {
                        db.releaseConnection(connection);
                        if (err) {
                            if (err.code == "ER_DUP_ENTRY") {
                                resolve("USER_ALREADY_REGISTERED")
                            }
                            reject(err)
                        } else {
                            resolve("USER_CREATED");
                        }
                    })
                })
                .catch(err => {
                    db.releaseConnection(connection);
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
                    connection.query('SELECT * FROM `User` WHERE email = ? AND isActive= 1', [email],
                        function (error, rows) {
                            db.releaseConnection(connection);
                            if (error) {
                                reject(error);
                            }
                            else {
                                if (rows && rows.length > 0) {
                                    let pass = bcrypt.compareSync(password, rows[0].password);
                                    if (pass) {
                                        resolve(rows);
                                    } else {
                                        let err = 'INVALID_PASSWORD';
                                        reject(err);
                                    }
                                } else {
                                    let err = "INVALID_EMAIL";
                                    reject(err);
                                }
                            }
                        });
                })
                .catch(err => {
                    db.releaseConnection(connection);
                    reject(err);
                })
        });
    }

    
    static forgotPassword(data) {
        var salt = bcrypt.genSaltSync(saltRounds);
        var newPasswordHash = bcrypt.hashSync(data.newPassword, salt);
        var connection , userdata ="";
        var email = data.email;
        return new Promise((resolve, reject) => {
            db.getConnection().
                then(conn => {
                    connection = conn;
                    db.beginTransaction(connection);
                }).then(()=>{
                    
                    return new Promise((res,rej) => {
                    connection.query('SELECT * FROM `User` WHERE email = ? AND isActive= 1', [email],
                        function (error, rows) {
                            if (error) {
                                db.rollbackTransaction(connection);
                                db.releaseConnection(connection);
                                reject(error);
                            }
                            else {
                                if (rows && rows.length > 0) {
                                        res(rows[0]);
                                    }
                                 else {
                                    let err = "INVALID_EMAIL";
                                    db.rollbackTransaction(connection);
                                    db.releaseConnection(connection);
                                    resolve(err);
                                }
                            }
                        });
                    })
                }) .then((userResult) => {
                    userdata = userResult
                    userdata["password"] = newPasswordHash;
                    delete userdata["userRecordId"];
                    return new Promise((res, rej) => {
                            connection.query(`UPDATE user SET isActive = 0  WHERE isActive = 1 AND email = ? `, [data.email], (err, result) => {
                                if (err) {
                                    db.rollbackTransaction(connection);
                                    db.releaseConnection(connection);
                                    reject(err)
                                } else {
                                    res(result);
                                }
                            })
                        })
                    })
                    .then(() => {
                        connection.query(`INSERT INTO User SET ?`, [userdata], (err, result) => {
                            if (err) {
                                db.rollbackTransaction(connection);
                                db.releaseConnection(connection);
                                reject(err)
                            } else {
                                db.commitTransaction(connection);
                                db.releaseConnection(connection);
                                resolve("PASSWORD_UPDATED");
                            }
                        })
                    })
                .catch(err => {
                    db.rollbackTransaction(connection);
                    db.releaseConnection(connection);
                    reject(err);
                })
        });
    }
}

module.exports = UserService;