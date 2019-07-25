const db = require('../util/db');
const User = require('../model/User');
class UserService {

    static getUsers(id) {
        var connection;
        return new Promise((resolve, reject) => {
            db.getConnection().
                then(conn => {
                    connection = conn;
                    connection.query('select * from User ', (err,results) => {
                        if(err) { 
                            reject(err) 
                        }else{
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
        var connection;
        return new Promise((resolve, reject) => {
            db.getConnection().
                then(conn => {
                    connection = conn;
                    //occupation['createdBy'] = user;
                    connection.query(`INSERT INTO User SET ?`, [data], (err, result) => {
                        db.releaseConnection(connection);
                        if (err) {
                            console.log("error  of api",err.code)
                            if(err.code == "ER_DUP_ENTRY"){
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

    static authUser(data){
        var connection;
        var email = data.email;
        var password = data.password;
        return new Promise((resolve, reject) => {
            db.getConnection().
                then(conn => {
                    connection = conn;
                    //occupation['createdBy'] = user;
                    connection.query(`select userId from User where email = ? and password = ? `, [email,password], (err, results) => {
                        db.releaseConnection(connection);
                        if (err) {
                            console.log(err)
                            reject(err)
                        } else {
                           if(results.length == 0 ){
                               resolve("INVALID_USER")
                           }else{
                               UserService.getUserById(results[0].userId).then( user => {
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