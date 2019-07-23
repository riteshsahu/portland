const AgentInfoService = require('../service/agentInfoService');
class AgentInfoController {

    static addAgentInfo(req, res) {
        let agentInfo = req.body;
        AgentInfoService.addAgentInfo(agentInfo).then(data => {
            res.json(data);
        }).catch(err => {
            res.status(500).send(err);
        });
    }

    static getAgentInfo(req, res) {
        let userId = req.headers['user_id'];
        AgentInfoService.addAgentInfo(agentInfo).then(data => {
            res.json(data);
        }).catch(err => {
            res.status(500).send(err);
        });
    }
}

module.exports = AgentInfoController;