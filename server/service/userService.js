const db = require('../util/db');
const User = require('../model/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;

class UserService {

    static getUserList() {
        var connection;
        return new Promise((resolve, reject) => {
            db.getConnection().
                then(conn => {
                    connection = conn;
                    connection.query('Select * from User WHERE isActive = 1 AND role != 1', (err, results) => {
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


    static getUsers(query) {
        let firstName = query.firstName;
        let lastName = query.lastName;
        let email = query.email;
        let role = query.role;

        console.log('---query----',query);
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
                    connection.query('select * from User WHERE isActive= 1 AND role != 1 AND (role LIKE  ? AND firstName LIKE ? AND lastName LIKE ? AND email LIKE ?) ',
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
                            [data.updatedAt, data.updatedBy, id], (err, results) => {
                                if (err) {
                                    db.rollbackTransaction(connection);
                                    db.releaseConnection(connection);
                                    console.log("--error---", err);
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
                        createAt: data.createAt,
                        updatedAt: data.updatedAt,
                        createBy: data.createBy,
                        updatedBy: data.updatedBy
                    }
                    connection.query('INSERT INTO User SET ?',
                        [updatedData], (err, results) => {
                            if (err) {
                                db.rollbackTransaction(connection);
                                db.releaseConnection(connection);
                                console.log("--error---", err);
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
                    connection.query('delete from User  WHERE userId = ? ', [id], (err, results) => {
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
        var salt = bcrypt.genSaltSync(saltRounds);
        var hash = bcrypt.hashSync(data.password, salt);
        data.password = hash;
        console.log("---hash paswro---", data);
        var connection;
        return new Promise((resolve, reject) => {
            db.getConnection().
                then(conn => {
                    connection = conn;
                    return new Promise((res, rej) => {
                        connection.query(`Select email from User `, (err, result) => {
                            // db.releaseConnection(connection);
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
                }).then(() => {
                    data = db.addAttributesForNew(data, data.userId);
                    delete data.userId;
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

        return new Promise((resolve, reject) => {
            db.getConnection().
                then(conn => {
                    connection = conn;
                    connection.query('SELECT * FROM `User` WHERE email = ?', [email],
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
                    reject(err);
                })
        });
    }

}

module.exports = UserService;