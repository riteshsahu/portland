const express = require('express');
const chatRoutes = express.Router(); 

const chatController = require('../controller/chatController');



chatRoutes.get('/:id/:role', chatController.getRoleChatHistory);
chatRoutes.post('/notification',chatController.getUserNotifications);

module.exports =  chatRoutes;
