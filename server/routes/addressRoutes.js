const express = require('express');
const AddressRoutes = express.Router(); 
const AddressController = require('../controller/addressController');
AddressRoutes.post('/', AddressController.addAddress);


module.exports =  AddressRoutes;