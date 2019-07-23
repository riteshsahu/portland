const express = require('express');
const clientCreditFileRoutes = express.Router(); 
const ClientCreditFileController = require('../controller/clientCreditFileController');
clientCreditFileRoutes.post('/', ClientCreditFileController.addClientCreditFile);


module.exports =  clientCreditFileRoutes;