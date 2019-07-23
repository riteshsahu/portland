const express = require('express');
const manageCustomerRoutes = express.Router(); 

const ManageCustomerController = require('../controller/manageCustomerController');



manageCustomerRoutes.post('/', ManageCustomerController.manageCustomer);


module.exports =  manageCustomerRoutes;