const db = require('../util/db');
const CcOfficer = require('../model/ccOfficer');

class CcOfficerService {

    static getccOfficerInfoByUserId(userId) {
        return new Promise((resolve, reject) => {
            var connection;
            db.getConnection().
                then(conn => {
                    connection = conn;
                    connection.query(`Select * from CCOfficer where userId = ?`, [userId], (err, results) => {
                        db.releaseConnection(connection);
                        if (err) {
                            console.log(err)
                            reject(err)
                        } else {
                            resolve( new CcOfficer(results[0]))
                        }
                    })
                })
                .catch(err => {
                    reject(err);
                })
        })
    }

    static addccOfficerInfo(ccOfficerInfo, ) {
        return new Promise((resolve, reject) => {
            var connection;
            db.getConnection().
                then(conn => {
                    connection = conn;
                    connection.query(`INSERT INTO CCOfficer SET ?`, [ccOfficerInfo], (err, result) => {
                        db.releaseConnection(connection);
                        if (err) {
                            console.log(err)
                            reject(err)
                        } else {
                            resolve(result.insertId)
                        }
                    })
                })
                .catch(err => {
                    reject(err);
                })
        })
    }

}

module.exports = CcOfficerService;
