const express = require('express');
const contactInfoRoutes = express.Router(); 
const contactInfoController = require('../controller/contactInfoController');

contactInfoRoutes.post('/', contactInfoController.addContactInfo);

module.exports =  contactInfoRoutes;