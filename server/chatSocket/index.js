// const ClientManager = require('./ClientManager')
// const ChatroomManager = require('./ChatroomManager')
// const makeHandlers = require('./handlers')

// const clientManager = ClientManager()
// const chatroomManager = ChatroomManager()

const chatService = require('../service/chatService');
const users = {};

function socketConnection (io) {
    io.on('connection', client => {
        console.log("%s client connected", client.id);
        client.on('user logged in', (userData) => {
            // console.log(userData);
            users[client.id] = userData;
            users[client.id]["socket"] = client;    // store client socket
        });

        // subscribe user to chat room
        client.on('subscribe to main chat', function(data) {
            client.join(data.JobId + "_main");
            // read all messages of subscribed user in main chat room
            if (users[client.id]) {
                chatService.readUsersMessagesInMainChat(data.JobId, users[client.id].userId);
                console.log("%s joined main chat %s", users[client.id].firstName, data.JobId);
            }

            // chatService.subscribeUser(data)
            // .then(results => {
            //     console.log("%s joining main chat %s", client.id, data.JobId);
            //     client.join(data.JobId);
            // })
            // .catch(err => {
            //     console.log('error', err)
            // })
        });

        client.on('subscribe to role chat', function(data) {
            client.join(`${data.JobId}_${data.roleId}`);
            // read all messages of subscribed user in main chat room
            if (users[client.id]) {
                console.log("reading role chat notifications of %s", users[client.id].firstName);
                chatService.readUsersMessagesInRoleChat(data.JobId, data.roleId, users[client.id].userId)
                console.log("%s joining role chat %s", users[client.id].firstName, `${data.JobId}_${data.roleId}`);
            }
        });

        client.on('unsubscribe from main chat', function(data) {
            client.leave(data.JobId + "_main");
            if (users[client.id]) {
                console.log("%s leaving main chat %s", users[client.id].firstName, data.JobId);
            }
        });

        client.on('unsubscribe from role chat', function(data) {
            client.leave(`${data.JobId}_${data.roleId}`);
            if (users[client.id]) {
                console.log("%s leaving role chat %s", users[client.id].firstName, `${data.JobId}_${data.roleId}`);
            }
        });

        // subscribe to private chat
        // client.on('subscribe to private chat', function (data) {
        //     chatService.subscribePrivateUser(data)
        //         .then(results => {
        //             console.log("%s joining private chat %s", client.id, data.privateChatId);
        //             client.join(data.privateChatId);
        //         })
        //         .catch(err => {
        //             console.log('error', err)
        //         })
        // });

        // unsubscribe from all jobs
        // client.on('unsubscribe', function(data) {
        //     chatService.unsubscribeUserFromAllJobs(data)
        //         .then(results => {
        //             console.log("user left room", data.JobId)
        //         })
        //         .catch(err => {
        //             console.log('error', err)
        //         })
        // });

        client.on('main chat send message', function(data) {
            chatService.messageUpdate(data)
            .then(result => {
                // broadcast message to all users subscribed to main chat
                console.log("broadcasting msg to main chat %s", data.JobId);
                io.in(data.JobId + "_main").emit('main chat messages updated', result);

                // mark their message as read
                io.of('/').in(data.JobId + "_main").clients((error, clientsIds) => {
                    if (error) throw error;

                    usersIds = [];
                    clientsIds.forEach(clientId => {
                        if (clientId != client.id) {
                            // except message sender
                            if (users[clientId]) {
                                usersIds.push(users[clientId].userId);
                            }
                        }
                    })

                    if (usersIds.length > 0) {
                        chatService.readUsersMessagesInMainChat(data.JobId, usersIds);
                    }
                });

                // update notificaitons of all participants which are online
                let jobParticipantsIds = data.jobParticipants.map(participant => participant.userId);
                let participants = [];
                Object.keys(users).forEach(clientId => {
                    if (jobParticipantsIds.includes(users[clientId].userId)) {
                        participants.push(users[clientId]);
                    }
                })
                participants.forEach(participant => {
                    client.to(participant.socket.id).emit('update notifications');      
                })
            })
        });

        client.on('role chat send message', function(data) {
            chatService.roleMessageUpdate(data)
            .then(result => {
                // emit message update event to sender
                client.emit('role chat messages updated', result);
                // broadcast message update event to every participant currently on sender role
                console.log("broadcasting msg to role chat %s", `${data.JobId}_${data.senderRole}`);
                client.to(`${data.JobId}_${data.senderRole}`).emit('role chat messages updated', result);

                // mark their message as read
                io.of('/').in(`${data.JobId}_${data.senderRole}`).clients((error, clientsIds) => {
                    if (error) throw error;

                    usersIds = [];
                    clientsIds.forEach(clientId => {
                        if (clientId != client.id) {
                            // except message sender
                            if (users[clientId]) {
                                usersIds.push(users[clientId].userId);
                            }
                        }
                    })
                    if (usersIds.length > 0) {
                        chatService.readUsersMessagesInRoleChat(data.JobId, data.senderRole, usersIds);
                    }
                });

                // update notificaitons of all participants which are online
                let jobParticipantsIds = data.jobParticipants.map(participant => participant.userId);
                let participants = [];
                Object.keys(users).forEach(clientId => {
                    if (jobParticipantsIds.includes(users[clientId].userId)) {
                        participants.push(users[clientId]);
                    }
                })
                participants.forEach(participant => {
                    client.to(participant.socket.id).emit('update notifications');      
                })
            })
        });

        // client.on('private chat send message', function(data) {
        //     chatService.privateMessageUpdate(data)
        //     .then(result => {
        //         // broadcast message to everyone in private chat room
        //         io.in(data.JobId).emit('private chat messages update', result);
        //     })
        // });

        client.on('disconnect', () => {
            // unsubscribe user from all jobs
            if (users[client.id]) {
                chatService.unsubscribeUserFromAllJobs(users[client.id])
                delete users[client.id];            
            }
            console.log("%s client disconnected", client.id); 
        });
        
        client.on('error', error => {
            console.log('error', error)
        })
    });
}

module.exports = socketConnection;