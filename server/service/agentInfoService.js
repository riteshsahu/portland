const db = require('../util/db');
const AgentInfo = require('../model/agentInfo');

class AgentInfoService {
    
    static getAgentInfo(userId){
        var connection;
            db.getConnection().
                then(conn => {
                    connection = conn;
                    //address['createdBy'] = user;
                    connection.query(`Select * from AgentInfo where userId =  ?`, [userId], (err, result) => {
                        db.releaseConnection(connection);
                        if (err) {
                            console.log(err)
                            reject(err)
                        } else {
                            resolve(new AgentInfo(result[0]))
                        }
                    })
                })
                .catch(err => {
                    reject(err);
                })
    }
    
    static addAgentInfo(agentInfo) {
        // let agentInfoList = agentInfo.map( agent =>{
        //     return [agent.legalName, agent.operatingName, agent.website, agent.email, agent.branches,
        //     agent.userId, agent.createDate, agent.createdBy, agent.updateDate, agent.updatedBy ];
        // })
        // console.log(agentInfoList);

        return new Promise((resolve, reject) => {
            var connection;
            db.getConnection().
                then(conn => {
                    connection = conn;
                    //address['createdBy'] = user;
                    connection.query(`INSERT INTO AgentInfo Set ?`, [agentInfo], (err, result) => {
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

module.exports = AgentInfoService;
