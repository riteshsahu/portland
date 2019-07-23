const express = require('express');
const businessInfoRoutes = express.Router(); 
const businessInfoController = require('../controller/businessInfoController');

businessInfoRoutes.post('/', businessInfoController.addBusinessInfo);

module.exports =  businessInfoRoutes;