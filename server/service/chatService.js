const db = require('../util/db');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;
const Message = require('../model/Message');

class ChatService {

    static subscribeUser(data) {
        var connection;
        return new Promise((resolve, reject) => {
            db.getConnection()
                .then(conn => {
                    connection = conn;
                    return db.beginTransaction(conn);
                })
                .then(() => {
                    return new Promise((resJob, rejJob) => {
                        connection.query('Update JobUsers SET isSubscribed = 0 WHERE userId = ? ',
                            [data.userId],
                            (err, results) => {
                                if (err) {
                                    db.rollbackTransaction(connection);
                                    db.releaseConnection(connection);
                                    rejJob(err)
                                    reject(err)
                                } else {
                                    resJob(results);
                                }
                            })
                    })
                })
                .then((results) => {
                    return new Promise((resS, rejS) => {
                        connection.query('Update JobUsers SET isSubscribed = 1 WHERE userId = ? and jobId = ?',
                            [data.userId, data.room],
                            (err, results) => {
                                if (err) {
                                    db.rollbackTransaction(connection);
                                    db.releaseConnection(connection);
                                    rejS(err)
                                    reject(err)
                                } else {
                                    db.commitTransaction(connection);
                                    db.releaseConnection(connection);
                                    resS(results);
                                    resolve(results);
                                }
                            })
                    })
                })
                .catch(err => {
                    console.log('error 1----', err);
                    db.releaseConnection(connection);
                    reject(err);
                })
        });
    }

    static messageUpdate(data) {
        var connection, messageId, isSubscribedArray;
        return new Promise((resolve, reject) => {
            db.getConnection()
            .then(conn => {
                connection = conn;
                return db.beginTransaction(conn);
            })
            .then(() => {
                let message = {
                    message: data.message,
                    creatorId: data.userId,
                    isVisibleToClient: data.isVisibleToClient
                }
                message = db.addAttributesForNew(message, data.userId);
                return new Promise((resMessage, rejMessage) => {
                    connection.query('INSERT INTO Message SET ?',
                    [message], 
                    (err, result) => {
                        if(err) {
                            db.rollbackTransaction(connection);
                            db.releaseConnection(connection);
                            rejMessage(err);
                            reject(err);
                        } else {
                            messageId = result.insertId;
                            db.commitTransaction(connection);
                            resMessage(result)
                        }
                    })
                })
            })
            .then(() => {
                return new Promise((resJobUser, rejJobUser) => {
                    connection.query('SELECT isSubscribed, userId from JobUsers where jobId = ?',
                    [data.room], 
                    (err, result) => {
                        if(err) {
                            db.rollbackTransaction(connection);
                            db.releaseConnection(connection);
                            rejJobUser(err);
                            reject(err);
                        } else {
                            console.log('result of job user', result);
                            isSubscribedArray = result;
                            db.commitTransaction(connection);
                            resJobUser(result)
                        }
                    })
                })
            })
            .then(() => {
                let records = [];
                isSubscribedArray.map(value => {
                    records.push([value.userId, data.room, messageId, value.isSubscribed, new Date(), data.userId])
                })
                return new Promise((resMessageRecipient, rejMessageRescipient) => {
                    connection.query('INSERT INTO MessageRecipient ( recipientId, recipientGroupId, messageId, isRead, createAt, createBy) VALUES ? ',
                    [records], 
                    (err, result) => {
                        if(err) {
                            db.rollbackTransaction(connection);
                            db.releaseConnection(connection);
                            rejMessageRescipient(err);
                            reject(err);
                        } else {
                            console.log('result of message user', result);
                            db.commitTransaction(connection);
                            resMessageRecipient(result);
                        }
                    })
                })
            })
            .then(() => {
                return new Promise((resMessage, rejMessage) => {
                    connection.query('SELECT * from Message WHERE id=?',
                    [messageId], 
                    (err, data) => {
                        if(err) {
                            db.rollbackTransaction(connection);
                            db.releaseConnection(connection);
                            rejMessage(err);
                            reject(err);
                        } else {
                            let message = {};
                            if (data && data.length > 0) {
                                message = new Message(data[0]);
                                console.log('message---', message)
                            }
                            db.commitTransaction(connection);
                            db.releaseConnection(connection);
                            resMessage(message)
                            resolve(message)
                        }
                    })
                })
            })
            .catch(err => {
                console.log('error 1----', err);
                db.releaseConnection(connection);
                reject(err);
            })
        });
    }

    // static messageById(id, connection) {
    //     return new Promise((resolve, reject) => {
    //         // var connection;
    //         // db.getConnection().then((conn) => {
    //         //     connection = conn;
    //             connection.query('select * from Message where id = ? ', [id], (err, data) => {
    //                 if (err) {
    //                     reject(err);
    //                 } else {
    //                     let message = {};
    //                     if (data && data.length > 0) {
    //                         message = new Message(data[0]);
    //                         console.log('message---', message)
    //                     }
    //                     resolve(message);
    //                 }
    //             })
    //        // })
    //     })
    // }

}

module.exports = ChatService;
