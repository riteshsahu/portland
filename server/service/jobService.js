const db = require('../util/db');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;

class JobService {

    static createJob(data) {
        console.log('--datat---', data);
        var connection;
        return new Promise((resolve, reject) => {
            db.getConnection().
                then(conn => {
                    connection = conn;
                    return db.beginTransaction(conn);
                }).then(() => {
                    return new Promise((res, rej) => {
                        connection.query('INSERT INTO Job ( jobId, jobTitle, jobDescription , jobCreatedBy, jobStatus, isActive, createAt, updatedAt, createBy, updatedBy) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ',
                            [data.jobId, data.jobTitle, data.jobDescription, data.jobCreatedBy, data.jobStatus, data.isActive, data.createAt, data.updatedAt, data.createBy, data.updatedBy],
                            (err, results) => {                    // jobCreatedBy                                                                                 
                                if (err) {
                                    db.rollbackTransaction(connection);
                                    db.releaseConnection(connection);
                                    reject(err)
                                } else {
                                    res(results);
                                }
                            })
                    })
                })
                .then((results) => {
                    if(data.jobUsers.length > 0) {
                        let jobUsers = data.jobUsers.map(dt => {
                            let arr = [];
                            arr[0] = data.jobId;
                            arr[1] = dt;
                            arr[2] = data.isActive;
                            arr[3] = 0;
                            arr[4] = new Date()
                            arr[5] = null
                            arr[6] = data.createBy,
                            arr[7] = null;
                            return arr;
                        })
                        console.log('job users-----', jobUsers);
                        connection.query('INSERT INTO JobUsers ( jobId, userId, isActive, isSubscribed, createAt, updatedAt, createBy, updatedBy) VALUES ? ',
                            [jobUsers],
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
                            }
                        )
                    } else {
                        db.releaseConnection(connection);
                        resolve(results)
                    }
                    
                })
                .catch(err => {
                    db.releaseConnection(connection);
                    reject(err);
                })
        });
    }

    static updateJob(jobId, data) {
        var connection;
        return new Promise((resolve, reject) => {
            db.getConnection().
                then(conn => {
                    connection = conn;
                    return db.beginTransaction(conn);
                })
                .then(() => {
                    return new Promise((resJob, rejJob) => {
                        connection.query(' Update Job SET isActive = 0, updatedAt =?, updatedBy= ?  WHERE jobId = ? ',
                            [new Date(), data.updatedBy, jobId],
                            (err, results) => {
                                if (err) {
                                    db.rollbackTransaction(connection);
                                    db.releaseConnection(connection);
                                    reject(err)
                                } else {
                                    resJob();
                                }
                            })
                    })
                })
                .then(() => {
                    return new Promise((resS, rejS) => {
                        connection.query('Select * from JobUsers  WHERE jobId = ? AND isActive = 1 ',
                            [jobId],
                            (err, results) => {
                                if (err) {
                                    db.rollbackTransaction(connection);
                                    db.releaseConnection(connection);
                                    reject(err)
                                } else {
                                    var isDelete = [], isAdded = [];
                                    results.map(dt => {
                                        let count = 0;
                                        var res = data.jobUsers.findIndex(userId => {
                                            return (userId == dt.userId)
                                        });
                                        if (!(res >= 0)) {
                                            isDelete.push(dt.userId);
                                        }
                                    })

                                    data.jobUsers.map(userId => {
                                        var resUpdated = results.findIndex(resData => {
                                            return (userId == resData.userId)
                                        });

                                        if (!(resUpdated >= 0)) {
                                            isAdded.push(userId);
                                        }
                                    })
                                    var resSResponse = {
                                        isDelete: isDelete,
                                        isAdded: isAdded
                                    }
                                    resS(resSResponse);
                                }
                            })
                    })
                })
                .then((resSResponse) => {
                    return new Promise((resJob, rejJob) => {
                        if (resSResponse.isDelete.length > 0) {
                            connection.query(' Update JobUsers SET isActive = 0, updatedAt =?, updatedBy= ?  WHERE jobId = ? AND userId in ?  ',
                                [new Date(), data.updatedBy, jobId, [resSResponse.isDelete]],
                                // [deleteArr],
                                (err, results) => {
                                    if (err) {
                                        db.rollbackTransaction(connection);
                                        db.releaseConnection(connection);
                                        rejJob(err)
                                        reject(err)
                                    } else {
                                        resJob(resSResponse);
                                    }
                                })
                        } else {
                            resJob(resSResponse);
                        }
                    })

                })
                .then((resSResponse) => {
                    return new Promise((resUser, rejUser) => {
                        if (resSResponse.isAdded.length > 0) {
                            let jobUsers = resSResponse.isAdded.map(dt => {
                                let arr = [];
                                arr[0] = jobId;
                                arr[1] = dt;
                                arr[2] = 1;
                                arr[3] = 0;
                                arr[4] = new Date()
                                arr[5] = null;
                                arr[6] = data.createBy;
                                arr[7] = null;
                                return arr;
                            })
                            connection.query('INSERT INTO JobUsers ( jobId, userId, isActive, isSubscribed, createAt, updatedAt, createBy, updatedBy) VALUES ?  ',
                                [jobUsers],
                                (err, results) => {
                                    if (err) {
                                        db.rollbackTransaction(connection);
                                        db.releaseConnection(connection);
                                        reject(err)
                                    } else {
                                        resUser();
                                    }
                                })
                        } else {
                            resUser();
                        }
                    })
                })
                .then(() => {
                    return new Promise((resUser, rejUser) => {
                        connection.query('INSERT INTO Job ( jobId, jobTitle, jobDescription, jobCreatedBy, jobStatus, isActive, createAt, updatedAt, createBy, updatedBy) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ',
                            [jobId, data.jobTitle, data.jobDescription, data.jobCreatedBy, data.jobStatus, 1, new Date(), data.updatedAt, data.createBy, data.updatedBy],
                            (err, results) => {
                                if (err) {
                                    db.rollbackTransaction(connection);
                                    db.releaseConnection(connection);
                                    reject(err)
                                } else {
                                    db.commitTransaction(connection);
                                    db.releaseConnection(connection);
                                    resolve("USER_JOB_UPDTAED");
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

    static getJobs(query) {
        let jobId = query.jobId;
        let jobStatus = query.jobStatus;
        let jobCreatedBy = query.jobCreatedBy;
        // let role = query.role;
        console.log('---query----', query);
        var connection;
        return new Promise((resolve, reject) => {
            db.getConnection().
                then(conn => {
                    connection = conn;
                    connection.query(`select J.jobId, J.jobTitle,J.createAt, J.jobDescription, J.jobCreatedBy, J.jobStatus, JU.userId from Job J
                    LEFT JOIN JobUsers JU  ON J.jobId = JU.jobId  WHERE (J.jobId LIKE ? AND J.jobStatus LIKE ? AND J.jobCreatedBy LIKE ?)   AND J.isActive = 1 AND JU.isActive = 1`,
                        ["%" + jobId + "%", "%" + jobStatus + "%", "%" + jobCreatedBy + "%"], (err, results) => {
                            db.releaseConnection(connection);
                            if (err) {
                                reject(err)
                            } else {
                                // console.log("---result-----", results);
                                function isJobExist(oldId, id) {
                                    let count = 0;
                                    oldId.map(dt => {
                                        if (dt == id) {
                                            count = count + 1;
                                        }
                                    });
                                    return count;
                                }

                                if (results.length > 0) {
                                    let finalResult = [];
                                    let jobID = [];

                                    results.map(dt => {

                                        if (!isJobExist(jobID, dt.jobId)) {
                                            let ids = [];
                                            ids.push(dt.userId);

                                            jobID.push(dt.jobId);
                                            finalResult.push({
                                                jobId: dt.jobId, jobTitle: dt.jobTitle, createAt: dt.createAt,
                                                jobDescription: dt.jobDescription, jobCreatedBy: dt.jobCreatedBy, jobStatus: dt.jobStatus, userId: ids
                                            });
                                        } else {
                                            finalResult.map(availData => {
                                                if (dt.jobId == availData.jobId) {
                                                    availData.userId.push(dt.userId);
                                                }
                                            })
                                        }
                                    });
                                    db.releaseConnection(connection);
                                    resolve(finalResult);
                                } else {
                                    db.releaseConnection(connection);
                                    resolve(results);
                                }



                            }
                        })
                })
                .catch(err => {
                    db.releaseConnection(connection);
                    reject(err);
                })
        });
    }

    static deleteJob(id) {
        var connection;
        return new Promise((resolve, reject) => {
            db.getConnection().
                then(conn => {
                    connection = conn;
                    return new Promise((res, rej) => {
                        connection.query('update Job SET isActive = 0, jobStatus = 2  WHERE jobId = ? AND isActive = 1 ', [id], (err, results) => {
                            // db.releaseConnection(connection);
                            if (err) {
                                db.releaseConnection(connection);
                                reject(err)
                            } else {
                                res();
                                // resolve(results);
                            }
                        })
                    })
                })
                .then(() => {
                    // connection = conn;
                    connection.query('update JobUsers SET isActive = 0  WHERE jobId = ? ', [id], (err, results) => {
                        if (err) {
                            db.releaseConnection(connection);
                            reject(err)
                        } else {
                            db.releaseConnection(connection);
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

    

    static getAllJob(id) {
        var connection;
        return new Promise((resolve, reject) => {
            db.getConnection().
                then(conn => {
                    connection = conn;
                    connection.query(`select J.jobId, J.jobTitle,J.createAt, J.jobDescription, J.jobCreatedBy, J.jobStatus, JU.userId, U.role as createByRole from Job J
                    LEFT JOIN JobUsers JU  ON J.jobId = JU.jobId JOIN User U ON J.createBy = U.userId
                      WHERE  J.isActive = 1 AND JU.isActive = 1`
                  
                    
                    
                    // select J.jobId, J.jobTitle,J.createAt, J.jobDescription, J.jobCreatedBy, J.jobStatus, JU.userId from Job J
                    // LEFT JOIN JobUsers JU  ON J.jobId = JU.jobId
                    //   WHERE  J.isActive = 1 AND JU.isActive = 1`
                      , (err, results) => {
                            db.releaseConnection(connection);
                            if (err) {
                                reject(err)
                            } else {

                                function isJobExist(oldId, id) {
                                    let count = 0;
                                    oldId.map(dt => {
                                        if (dt == id) {
                                            count = count + 1;
                                        }
                                    });
                                    return count;
                                }

                                if (results.length > 0) {
                                    let finalResult = [];
                                    let jobID = [];

                                    results.map(dt => {

                                        if (!isJobExist(jobID, dt.jobId)) {
                                            let ids = [];
                                            ids.push(dt.userId);

                                            jobID.push(dt.jobId);
                                            finalResult.push({
                                                jobId: dt.jobId, jobTitle: dt.jobTitle, createAt: dt.createAt, createByRole:dt.createByRole,
                                                jobDescription: dt.jobDescription, jobCreatedBy: dt.jobCreatedBy, jobStatus: dt.jobStatus, userId: ids
                                            });
                                        } else {
                                            finalResult.map(availData => {
                                                if (dt.jobId == availData.jobId) {
                                                    availData.userId.push(dt.userId);
                                                }
                                            })
                                        }
                                    });
                                    resolve(finalResult);
                                } else {
                                    resolve(results);
                                }


                                // console.log("---list---",results);
                                // resolve(results);
                            }
                        })
                })
                .catch(err => {
                    console.log("---err--", err);
                    db.releaseConnection(connection);
                    reject(err);
                })
        });
    }

    static filterRecentJob(result){
        function isExist(id, jobArr) {
            if (jobArr.length > 0) {
                let keyIndex, count = 0;
                jobArr.map((dt, index) => {
                    if (dt.jobId == id) {
                        count = count + 1;
                        keyIndex = index;
                    }
                })
                if (count > 0) {
                    return keyIndex;
                } else {
                    return "NOT_EXIST"
                }
            } else {
                return "NOT_EXIST"
            }
        }
        let jobList = [];
        if (result.length > 0) {

            result.map((dt, i) => {
                if (isExist(dt.jobId, jobList) == "NOT_EXIST") {
                    jobList.push({
                        jobTitle: dt.jobTitle,
                        jobId: dt.jobId,
                    })
                } else {
                   
                }
            })
            return jobList;
        }
        else {
            return result;
        }
    }

    static getUserJobs(id) {
        var connection;
        return new Promise((resolve, reject) => {
            db.getConnection().
                then(conn => {
                    connection = conn;
                    // connection.query(`select J.jobId, J.jobTitle,J.createAt, J.jobDescription, J.jobCreatedBy, J.jobStatus, JU.userId from JobUsers 
                    // JU LEFT JOIN Job J ON J.jobId = JU.jobId WHERE J.isActive = 1 AND JU.isActive = 1 AND J.jobStatus = 1 AND JU.userId=? `, [id], (err, results) => {
                           
                    connection.query(`select DISTINCT J.jobId, J.jobTitle, message.createAt, J.jobDescription, J.jobCreatedBy, J.jobStatus, JU.userId
                    from JobUsers JU LEFT JOIN Job J ON J.jobId = JU.jobId 
                   LEFT JOIN messagerecipient ON J.jobId = messagerecipient.recipientGroupId
                     LEFT JOIN message ON messagerecipient.messageId = message.id 
                   WHERE J.isActive = 1 AND JU.isActive = 1 AND J.jobStatus = 1 AND JU.userId=?  ORDER BY message.createAt DESC`,[id],(err,results) => {

     
                        db.releaseConnection(connection);
                            if (err) {
                                console.log("error", err)
                                reject(err)
                            } else {
                                console.log("res", results);
                                
                                resolve(JobService.filterRecentJob(results));
                            }
                        });
                })
                .catch(err => {
                    console.log("---err--", err);
                    db.releaseConnection(connection);
                    reject(err);
                })
        })
    }


    static getUserCompletedJobs(id) {
        var connection;
        return new Promise((resolve, reject) => {
            db.getConnection().
                then(conn => {
                    connection = conn;
                    connection.query(`select J.jobId, J.jobTitle,J.createAt, J.jobDescription, J.jobCreatedBy, J.jobStatus, JU.userId from JobUsers 
                    JU LEFT JOIN Job J ON J.jobId = JU.jobId WHERE J.isActive = 0 AND JU.isActive = 0 AND J.jobStatus = 2 AND JU.userId=? `, [id], (err, results) => {
                            db.releaseConnection(connection);
                            if (err) {
                                console.log("error", err)
                                reject(err)
                            } else {
                                console.log("res", results)
                                resolve(results);
                            }
                        });
                })
                .catch(err => {
                    console.log("---err--", err);
                    db.releaseConnection(connection);
                    reject(err);
                })
        })
    }

    static getUserLatestJobs(id) {
        var connection;
        return new Promise((resolve, reject) => {
            db.getConnection().
                then(conn => {
                    connection = conn;
                    connection.query(`SELECT DISTINCT job.jobId, message.id, message.createAt FROM job LEFT JOIN 
                    messagerecipient ON job.jobId = messagerecipient.recipientGroupId LEFT JOIN
                     message ON messagerecipient.messageId = message.id WHERE job.isActive = 1 ORDER BY message.createAt DESC`, [id], (err, results) => {
                            db.releaseConnection(connection);
                            if (err) {
                                console.log("error", err)
                                reject(err)
                            } else {
                                console.log("res", results)
                                resolve(results);
                            }
                        });
                })
                .catch(err => {
                    console.log("---err--", err);
                    db.releaseConnection(connection);
                    reject(err);
                })
        })
    }

    static getJobParticipantsInfo(id) {
        var connection;
        return new Promise((resolve, reject) => {
            db.getConnection().
                then(conn => {
                    connection = conn;
                        connection.query(`SELECT JU.jobId,U.firstName,U.lastName,U.email,U.role From User U
                        INNER JOIN JobUsers JU ON U.userId = JU.userID and U.isActive=1
                        where JU.jobId = ?  and U.status = 1 and JU.isActive = 1`, [id], (err, results) => {
                             db.releaseConnection(connection);
                            if (err) {
                                console.log("error", err)
                                reject(err)
                            } else {
                                console.log("Result of participant api", results)
                                resolve(results);
                            }
                        });
                })
                .catch(err => {
                    console.log("---err--", err);
                    db.releaseConnection(connection);
                    reject(err);
                })
        })
    }
}

module.exports = JobService;
