const express = require('express');
const AgentFormRoutes = express.Router(); 
const AgentFormController = require('../controller/agentFormController');
IntekRoutes.post('/', AgentFormController.addAgentForm);


module.exports =  AgentFormRoutes;