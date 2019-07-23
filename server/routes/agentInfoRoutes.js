const express = require('express');
const agentInfoRoutes = express.Router(); 
const agentInfoController = require('../controller/agentInfoController');

agentInfoRoutes.post('/', agentInfoController.addAgentInfo);
agentInfoRoutes.get('/', agentInfoController.getAgentInfo);

module.exports =  agentInfoRoutes;