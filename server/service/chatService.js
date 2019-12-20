const db = require('../util/db');
const Message = require('../model/Message');
const AwsUtil = require('../util/Aws');

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
                .then((results) => {
                    return new Promise((resS, rejS) => {
                        connection.query('Update MessageRecipient SET isRead = 1 WHERE recipientId = ? and recipientGroupId = ?',
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

    static readUsersMessagesInMainChat(jobId, usersIds) {
        var connection;
        return new Promise((resolve, reject) => {
            db.getConnection()
                .then(conn => {
                    connection = conn;
                    return db.beginTransaction(conn);
                })
                .then(() => {
                    return new Promise((resS, rejS) => {
                        connection.query('Update MessageRecipient SET isRead = 1 WHERE recipientGroupId = ? AND recipientId IN (?)',
                            [jobId, usersIds],
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

    static readUsersMessagesInRoleChat(jobId, roleId, usersIds) {
        var connection;
        return new Promise((resolve, reject) => {
            db.getConnection()
                .then(conn => {
                    connection = conn;
                    return db.beginTransaction(conn);
                })
                .then(() => {
                    return new Promise((resS, rejS) => {
                        connection.query(`Update MessageRecipient MR JOIN User U ON U.userId = MR.createBy SET isRead = 1 
                        WHERE U.isActive = 1 AND isMainChat = 0 AND recipientGroupId = ? AND U.role = ? AND recipientId IN (?)`,
                            [jobId, roleId, usersIds],
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
                        isVisibleToClient: data.isVisibleToClient,
                    }

                    return new Promise((res, rej) => {
                        if (data.file) {
                            AwsUtil.updateFile(data.file).then(filePath => {
                                message.fileName = data.file.name
                                message.filePath = filePath;
                                message.fileType = data.file.type
                                res(message);
                            })
                        } else {
                            res(message);
                        }
                    })
                })
                .then((message) => {
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
                        connection.query('SELECT JU.isSubscribed, JU.userId from JobUsers JU JOIN User U on JU.userId = U.userId where JU.jobId = ? AND JU.userId != ? AND U.isActive = 1',
                            [data.JobId, data.userId],
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
                        records.push([value.userId, data.JobId, messageId, value.isSubscribed, new Date(), data.userId])
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

    static roleMessageUpdate(data) {
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
                        isVisibleToClient: data.isVisibleToClient,
                    }

                    return new Promise((res, rej) => {
                        if (data.file) {
                            AwsUtil.updateFile(data.file).then(filePath => {
                                message.fileName = data.file.name
                                message.filePath = filePath;
                                message.fileType = data.file.type
                                res(message);
                            })
                        } else {
                            res(message);
                        }
                    })
                })
                .then((message) => {
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
                        connection.query('SELECT JU.isSubscribed, JU.userId from JobUsers JU JOIN User U on JU.userId = U.userId where JU.jobId = ? AND U.isActive = 1 AND U.role = ?',
                            [data.JobId, data.recipientRole],
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
                        records.push([value.userId, data.JobId, messageId, value.isSubscribed, new Date(), data.userId, 0])
                    })
                    return new Promise((resMessageRecipient, rejMessageRescipient) => {
                        connection.query('INSERT INTO MessageRecipient ( recipientId, recipientGroupId, messageId, isRead, createAt, createBy, isMainChat) VALUES ? ',
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
                        isVisibleToClient: data.isVisibleToClient,
                    }

                    return new Promise((res, rej) => {
                        if (data.file) {
                            AwsUtil.updateFile(data.file).then(filePath => {
                                message.fileName = data.file.name
                                message.filePath = filePath;
                                message.fileType = data.file.type
                                res(message);
                            })
                        } else {
                            res(message);
                        }
                    })
                })
                .then((message) => {
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
                        records.push([ data.userId, data.room, messageId, 0, new Date(), data.userId,0])
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

    static getChatHistory(id, userId) {
        var connection;
        return new Promise((resolve, reject) => {
            db.getConnection().
                then(conn => {
                    connection = conn;
                    connection.query(`SELECT MR.recipientId ,MR.recipientGroupId, M.message, MR.isRead, SU.firstName senderFirstName, SU.lastName senderLastName, SU.role senderRole, 
                    M.createBy,M.createAt 
                    FROM MessageRecipient MR JOIN Message M ON MR.messageId = M.id 
                    JOIN User SU ON SU.userId = M.creatorId
                    WHERE MR.recipientGroupId = ? AND MR.isMainChat = 1 AND (MR.createBy = ? OR MR.recipientId = ?) 
                    AND SU.isActive = 1 GROUP BY M.id ORDER BY M.createAt ASC`, [id, userId, userId],(err, results) => {
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

// get all messages of current job where messages
// sent by current user to current role tab selected or sent by others to current role tab
    static getRoleChatHistory(id, userId, roleId) {
        var connection;
        return new Promise((resolve, reject) => {
            db.getConnection().
                then(conn => {
                    connection = conn;
                    connection.query(`SELECT MR.recipientId ,MR.recipientGroupId, M.message, MR.isRead,
                    SU.firstName senderFirstName, SU.lastName senderLastName, SU.role senderRole, 
                    RU.firstName recipientFirstName, RU.lastName recipientLastName, RU.role recipientRole, 
                    M.createBy,M.createAt FROM MessageRecipient MR JOIN Message M ON MR.messageId = M.id 
                    JOIN User SU ON SU.userId = M.creatorId JOIN User RU on RU.userId = MR.recipientId 
                    WHERE MR.recipientGroupId = ? AND SU.isActive = 1 AND RU.isActive = 1 AND MR.isMainChat = 0 AND
                    ((MR.createBy = ? AND RU.role = ?) OR (SU.role = ? AND MR.recipientId = ?)) GROUP BY M.id ORDER BY M.createAt ASC`, 
                    [id, userId, roleId, roleId, userId],(err, results) => {
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

    static getUserNotifications(id) {
        var connection;
        return new Promise((resolve, reject) => {
            db.getConnection()
                .then(conn => {
                    connection = conn;
                })
                .then(() => {
                    // get main chat notifications
                    return new Promise((resJob, rejJob) => {
                        connection.query(`SELECT MR.recipientGroupId jobId, j.jobTitle, COUNT(MR.recipientGroupId) count, MR.isMainChat 
                        FROM MessageRecipient as MR JOIN
                        Job as j ON MR.recipientGroupId = j.jobId Join User SU ON SU.userId = MR.createBy 
                        WHERE j.isActive = 1 AND SU.isActive = 1 AND MR.isRead = 0 AND MR.recipientId = ? AND MR.isMainChat = 1 
                        GROUP BY recipientGroupId`,
                            [id], (err, mainChatNotifications) => {
                                db.releaseConnection(connection);
                                if(err) {
                                    rejJob(err);
                                    reject(err);
                                } else {
                                    // resolve(ChatService.countUnreadMsg(results));
                                    resJob(mainChatNotifications);
                                }
                            })
                    })
                })
                .then((mainChatNotifications) => {
                    // get role chat notifications
                    connection.query(`SELECT MR.recipientGroupId jobId, j.jobTitle, MR.isMainChat, 
                    R.roleId, R.roleName, COUNT(SU.role) as count FROM MessageRecipient as MR JOIN
                    Job as j ON MR.recipientGroupId = j.jobId Join User SU ON SU.userId = MR.createBy JOIN Role R ON SU.role = R.roleId
                    WHERE j.isActive = 1 AND SU.isActive = 1 AND MR.isRead = 0 AND MR.recipientId = ? AND isMainChat = 0 
                    GROUP BY MR.recipientGroupId, SU.role`,
                        [id], (err, roleChatNotifications) => {
                            db.releaseConnection(connection);
                            if (err) {
                                reject(err);
                            } else {
                                let allChatNotifications = mainChatNotifications
                                    .concat(roleChatNotifications);

                                resolve(allChatNotifications);
                            }
                        })
                })
                .catch(err => {
                    db.releaseConnection(connection);
                    reject(err);
                })
        });
    }

    static unsubscribeUserFromAllJobs(data) {
        var connection;
        return new Promise((resolve, reject) => {
            db.getConnection()
                .then(conn => {
                    connection = conn;
                    return db.beginTransaction(conn);
                })
                .then(() => {
                    return new Promise((resS, rejS) => {
                        connection.query('Update JobUsers SET isSubscribed = 0 WHERE userId = ?',
                            [data.userId],
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
}

module.exports = ChatService;
