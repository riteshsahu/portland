const db = require('../util/db');
class DualProcessService {
    static addDualProcess(address, user) {
        return new Promise((resolve, reject) => {
            var connection;
            db.getConnection().
                then(conn => {
                    connection = conn;
                    address['createdBy'] = user;
                    connection.query(`INSERT INTO dualprocess SET ?`, [address], (err, result) => {
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

module.exports = DualProcessService;
