const express = require('express');
const residenceRoutes = express.Router(); 
const ResidenceController = require('../controller/residenceController');
residenceRoutes.post('/', ResidenceController.addResidence);


module.exports =  residenceRoutes;