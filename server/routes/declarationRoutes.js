const express = require('express');
const DeclarationRoutes = express.Router(); 
const DeclarationController = require('../controller/declarationController');
DeclarationRoutes.post('/', DeclarationController.addDeclaration);


module.exports =  DeclarationRoutes;