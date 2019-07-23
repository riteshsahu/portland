const express = require('express');
const occupationRoutes = express.Router(); 
const OccupationController = require('../controller/occupationController');
occupationRoutes.post('/', OccupationController.addOccupation);


module.exports =  occupationRoutes;