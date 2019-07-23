const db = require('../util/db');
const ContactInfo = require('../model/contactInfo');

class ContactInfoService {

    static getContactInfo(userId){
        return new Promise((resolve, reject) => {
            var connection;
            db.getConnection().
                then(conn => {
                    connection = conn;
                    connection.query(`Select * from ContactInfo where userId = ?`, [userId], (err, results) => {
                        db.releaseConnection(connection);
                        if (err) {
                            console.log(err)
                            reject(err)
                        } else {
                            resolve( results.map(result => { new ContactInfo(result)}) );
                        }
                    })
                })
                .catch(err => {
                    reject(err);
                })
        })
    }

    static addContactInfo(contactInfo, user) {
        return new Promise((resolve, reject) => {
            var connection;
            db.getConnection().
                then(conn => {
                    connection = conn;
                    connection.query(`INSERT INTO ContactInfo SET ?`, [contactInfo], (err, result) => {
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

module.exports = ContactInfoService;
