const express = require('express');
const BusinessBranchRoutes = express.Router(); 
const BusinessBranchController = require('../controller/businessBranchController');
BusinessBranchRoutes.post('/', BusinessBranchController.addBusinessBranch);


module.exports =  BusinessBranchRoutes;