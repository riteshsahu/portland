const express = require('express');
const clientRoutes = express.Router(); 
const ClientInfoController = require('../controller/clientInfoController');
clientRoutes.post('/', ClientInfoController.addClientInfo);


module.exports =  clientRoutes;