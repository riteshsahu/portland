// const ClientManager = require('./ClientManager')
// const ChatroomManager = require('./ChatroomManager')
// const makeHandlers = require('./handlers')

// const clientManager = ClientManager()
// const chatroomManager = ChatroomManager()

const chatService = require('../service/chatService');
const users = {};

function socketConnection (io) {
    io.on('connection', client => {
        console.log("%s user connected", client.id);
        client.on('user logged in', (user) => {
            users[client.id] = user;
            // console.log(users);
        });
        
        // subscribe to chat room
        client.on('subscribe to chat room', function(data) {
            client.join(data.JobId);
                console.log("%s joining main chat %s", client.id, data.JobId);

            // chatService.subscribeUser(data)
            // .then(results => {
            //     console.log("%s joining main chat %s", client.id, data.JobId);
            //     client.join(data.JobId);
            // })
            // .catch(err => {
            //     console.log('error', err)
            // })
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
        client.on('unsubscribe', function(data) {
            chatService.unsubscribeUserFromAllJobs(data)
                .then(results => {
                    console.log("user left room", data.JobId)
                })
                .catch(err => {
                    console.log('error', err)
                })
        });

        client.on('main chat send message', function(messageData) {
            chatService.messageUpdate(messageData)
            .then(result => {
                // broadcast message to everyone in main chat room
                console.log("broadcasting msg to ", messageData.JobId);
                // io.in(messageData.JobId).emit('main chat messages updated', result);
                io.in(messageData.JobId).emit('chat messages updated', result);
            })
        });

        client.on('role chat send message', function(messageData) {
            chatService.roleMessageUpdate(messageData)
            .then(result => {
                // broadcast message to everyone in role chat room
                io.in(messageData.JobId).emit('chat messages updated', result);
                // io.in(messageData.JobId).emit('role chat messages updated', result);
            })
        });

        // client.on('private chat send message', function(messageData) {
        //     chatService.privateMessageUpdate(messageData)
        //     .then(result => {
        //         // broadcast message to everyone in private chat room
        //         io.in(messageData.JobId).emit('private chat messages update', result);
        //     })
        // });

        client.on('disconnect', () => {
            // unsubscribe user from all jobs
            if (users[client.id]) {
                chatService.unsubscribeUserFromAllJobs(users[client.id])
                delete users[client.id];            
            }
            console.log("%s user disconnected", client.id); 
        });
        
        client.on('error', error => {
            console.log('error', error)
        })
    });
}

module.exports = socketConnection;