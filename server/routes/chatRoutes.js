const express = require('express');
const chatRoutes = express.Router(); 

const chatController = require('../controller/chatController');



chatRoutes.get('/:id', chatController.getMessageHistory);


module.exports =  chatRoutes;
