const express = require('express');
const userRoutes = express.Router(); 

const userController = require('../controller/userController');

userRoutes.post('/', userController.addUser);
userRoutes.get('/', userController.getUsers);
userRoutes.put('/:id', userController.editUser);
userRoutes.delete('/:id', userController.deleteUser);
userRoutes.post('/auth', userController.authUser);
userRoutes.put('/auth/forgotPassword', userController.forgotPassword);
userRoutes.get('/userList/:offset', userController.getUserList);
userRoutes.put('/updateProfile/:id',userController.updateUserProfile);
userRoutes.get('/userSuggestion', userController.getUserForSuggestions);

module.exports =  userRoutes;