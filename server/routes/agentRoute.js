const express = require('express');
const agentRoute = express.Router(); 
const AgentController = require('../controller/AgentController');

agentRoute.get('/', CountryController.getAgentById);


module.exports =  countryRoutes;