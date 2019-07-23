const express = require('express');
const authRoutes = express.Router(); 

const userController = require('../controller/userController');



authRoutes.post('/', userController.authUser);


module.exports =  authRoutes;