const db = require('../util/db');
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
                    db.releaseConnection(connection);
                    reject(err);
                })
        });
    }


    static subscribePrivateUser(data) {
        var connection;
        return new Promise((resolve, reject) => {
            db.getConnection()
                .then(conn => {
                    connection = conn;
                    return db.beginTransaction(conn);
                })
                .then(() => {
                    return new Promise((resJob, rejJob) => {
                        connection.query('Update private_chat SET isSubscribed = 0 WHERE jobId = ? ',
                            [data.jobId],
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
                        connection.query('Update private_chat SET isSubscribed = 1 WHERE privateChatId = ?',
                            [data.room],
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
                                if (err) {
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
                                if (err) {
                                    db.rollbackTransaction(connection);
                                    db.releaseConnection(connection);
                                    rejJobUser(err);
                                    reject(err);
                                } else {
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
                                if (err) {
                                    db.rollbackTransaction(connection);
                                    db.releaseConnection(connection);
                                    rejMessageRescipient(err);
                                    reject(err);
                                } else {
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
                                if (err) {
                                    db.rollbackTransaction(connection);
                                    db.releaseConnection(connection);
                                    rejMessage(err);
                                    reject(err);
                                } else {
                                    let message = {};
                                    if (data && data.length > 0) {
                                        message = new Message(data[0]);
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
                    db.releaseConnection(connection);
                    reject(err);
                })
        });
    }


    static privateMessageUpdate(data) {
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
                                if (err) {
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
                        connection.query('SELECT isSubscribed, privateChatFor,createBy from private_chat where privateChatId = ?',
                            [data.room],
                            (err, result) => {
                                if (err) {
                                    db.rollbackTransaction(connection);
                                    db.releaseConnection(connection);
                                    rejJobUser(err);
                                    reject(err);
                                } else {
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
                        records.push([value.privateChatFor, data.room, messageId, value.isSubscribed, new Date(), data.userId,0])
                        records.push([ data.userId, data.room, messageId, value.isSubscribed, new Date(), data.userId,0])
                    })
                    return new Promise((resMessageRecipient, rejMessageRescipient) => {
                        connection.query('INSERT INTO MessageRecipient ( recipientId, recipientGroupId, messageId, isRead, createAt, createBy,isMainChat) VALUES ? ',
                            [records],
                            (err, result) => {
                                if (err) {
                                    db.rollbackTransaction(connection);
                                    db.releaseConnection(connection);
                                    rejMessageRescipient(err);
                                    reject(err);
                                } else {
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
                                if (err) {
                                    db.rollbackTransaction(connection);
                                    db.releaseConnection(connection);
                                    rejMessage(err);
                                    reject(err);
                                } else {
                                    let message = {};
                                    if (data && data.length > 0) {
                                        message = new Message(data[0]);
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
                    db.releaseConnection(connection);
                    reject(err);
                })
        });
    }


    static getMessageHistory(id) {
        var connection;
        return new Promise((resolve, reject) => {
            db.getConnection().
                then(conn => {
                    connection = conn;
                    connection.query(` SELECT DISTINCT MR.recipientGroupId, M.id, M.message, U.role,M.createBy,M.createAt,M.isVisibleToClient, U.firstName, U.lastName 
                    FROM MessageRecipient MR JOIN Message M ON MR.messageId = M.id 
                    JOIN User U ON U.userId = M.creatorId WHERE U.isActive= 1 AND MR.recipientGroupId= ? ORDER BY M.createAt ASC`, [id],(err, results) => {
                            db.releaseConnection(connection);
                            if(err) {
                                reject(err)
                            } else {
                                resolve(results);
                            }
                        })
                })
                .catch(err => {
                    db.releaseConnection(connection);
                    reject(err);
                })
        });

    }
    

}

module.exports = ChatService;
