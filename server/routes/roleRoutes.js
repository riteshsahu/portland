const express = require('express');
const roleRoutes = express.Router(); 

const roleController = require('../controller/roleController');


roleRoutes.post('/', roleController.assignRole);

module.exports =  roleRoutes;