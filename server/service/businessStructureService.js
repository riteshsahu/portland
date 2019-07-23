const db = require('../util/db');
const BusinessStructure = require('../model/businessStructure');

class BusinessStructureService {

    static getBusinessStructureByUserId(userId){
        return new Promise((resolve, reject) => {
            var connection;
            db.getConnection().
                then(conn => {
                    connection = conn;
                    connection.query(`Select * from BusinessStructure where userId = ?`, [userId], (err, result) => {
                        db.releaseConnection(connection);
                        if (err) {
                            console.log(err)
                            reject(err)
                        } else {
                            resolve(resolve(BusinessStructure));
                        }
                    })
                })
                .catch(err => {
                    reject(err);
                })
        })
    }


    static addBusinessStructure(businessStructure) {
        return new Promise((resolve, reject) => {
            var connection;
            db.getConnection().
                then(conn => {
                    connection = conn;
                    connection.query(`INSERT INTO BusinessStructure SET ?`, [businessStructure], (err, result) => {
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

module.exports = BusinessStructureService;
