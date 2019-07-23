const express = require('express');
const userRoutes = express.Router(); 

const userController = require('../controller/userController');



userRoutes.post('/', userController.addUser);


module.exports =  userRoutes;