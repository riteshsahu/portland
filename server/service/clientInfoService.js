const db = require('../util/db');
const ClientInfo = require('../model/clientInfo');
class ClientInfoService {

  
    static addClientInfo(clientInfo, user) {
        console.log('user...................................',user)
        return new Promise((resolve, reject) => {
            var connection;
            db.getConnection().
                then(conn => {
                    connection = conn;
                    clientInfo['createdBy'] = user;
                    connection.query(`INSERT INTO clientinfo SET ?`, [clientInfo], (err, result) => {
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

module.exports = ClientInfoService;
