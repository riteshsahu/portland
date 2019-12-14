const express = require('express');
const chatRoutes = express.Router(); 

const chatController = require('../controller/chatController');



chatRoutes.get('/:id/:userId', chatController.getChatHistory);
chatRoutes.get('/:id/:userId/:role', chatController.getRoleChatHistory);
chatRoutes.post('/notification',chatController.getUserNotifications);

module.exports =  chatRoutes;
