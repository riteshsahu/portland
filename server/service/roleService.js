const db = require('../util/db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

class RoleService {

    static assignRole(data) {
        var connection;
        return new Promise((resolve, reject) => {
            db.getConnection().
                then(conn => {
                    connection = conn;
                    return db.beginTransaction(conn);
                }).then(() => {
                    connection.query('INSERT INTO Role SET ?  ', [data], (err, results) => {
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
                    reject(err);
                })
        });
    }
}

module.exports = RoleService;