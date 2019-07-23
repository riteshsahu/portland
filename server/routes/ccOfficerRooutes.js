const express = require('express');
const ccOfficerRoutes = express.Router(); 
const CcOfficerController = require('../controller/ccOfficerController');
ccOfficerRoutes.post('/', CcOfficerController.addccOfficerInfo);


module.exports =  ccOfficerRoutes;