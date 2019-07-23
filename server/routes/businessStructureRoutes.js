const express = require('express');
const businessStructureRoutes = express.Router(); 
const businessStructureController = require('../controller/businessStructureController');

businessStructureRoutes.post('/', businessStructureController.addBusinessStructure);

module.exports =  businessStructureRoutes;