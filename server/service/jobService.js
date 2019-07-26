const db = require('../util/db');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;

class JobService {

    static createJob(data) {
        var connection;
        return new Promise((resolve, reject) => {
            db.getConnection().
                then(conn => {
                    connection = conn;
                    return db.beginTransaction(conn);
                }).then(() => {
                    return new Promise((res, rej) => {
                        connection.query('INSERT INTO Job ( jobId, jobTitle, createdBy, jobStatus) VALUES(?, ?, ?, ?) ',
                            [data.jobId, data.jobTitle, data.createdBy, data.jobStatus],
                            (err, results) => {
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
                    connection.query('INSERT INTO Participant ( jobId, participants) VALUES(?, ?) ',
                        [data.jobId, data.participants],
                        (err, results) => {
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

module.exports = JobService;