const express = require('express');
const BusinessFormRoutes = express.Router(); 
const BusinessFormController = require('../controller/businessFormController');
BusinessFormRoutes.post('/', BusinessFormController.addBusinessForm);


module.exports =  BusinessFormRoutes;