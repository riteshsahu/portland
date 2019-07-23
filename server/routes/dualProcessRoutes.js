const express = require('express');
const DualProcessRoutes = express.Router(); 
const DualProcessController = require('../controller/dualProcessController');
DualProcessRoutes.post('/', DualProcessController.addDualProcess);


module.exports =  DualProcessRoutes;