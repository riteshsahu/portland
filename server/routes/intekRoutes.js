const express = require('express');
const IntekRoutes = express.Router(); 
const IntekController = require('../controller/intekController');
IntekRoutes.post('/', IntekController.addIntek);


module.exports =  IntekRoutes;