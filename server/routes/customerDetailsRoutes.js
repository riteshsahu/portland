const express = require('express');
const customerDetailtsRoutes = express.Router(); 
const CustomerDetailsController = require('../controller/customerDetailsController');
customerDetailtsRoutes.post('/', CustomerDetailsController.customerDetails);


module.exports =  customerDetailtsRoutes;