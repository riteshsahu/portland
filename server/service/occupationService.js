const db = require('../util/db');
class OccupationService {
    static addOccupation(occupation, user) {
        return new Promise((resolve, reject) => {
            var connection;
            db.getConnection().
                then(conn => {
                    connection = conn;
                    occupation['createdBy'] = user;
                    connection.query(`INSERT INTO Occupation SET ?`, [occupation], (err, result) => {
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

module.exports = OccupationService;
