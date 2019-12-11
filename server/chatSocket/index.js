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
        
        // subscribe to a job
        client.on('subscribe', function(data) {
            if (data.privateChat == true) {
                chatService.subscribePrivateUser(data)
                .then(results => {
                    console.log("%s joining private room %s", client.id, data.room);
                    client.join(data.room);
                })
            }
            else
            chatService.subscribeUser(data)
            .then(results => {
                console.log("%s joining room %s", client.id, data.room);
                client.join(data.room);
            })
            .catch(err => {
                console.log('error', err)
            })
        });

        // unsubscribe from all jobs
        client.on('unsubscribe', function(data) {
            chatService.unsubscribeUserFromAllJobs(data)
                .then(results => {
                    console.log("user left room", data.room)
                })
                .catch(err => {
                    console.log('error', err)
                })
        });

        client.on('send message', function(data) {
            if (data.privateChat == true) {
                chatService.privateMessageUpdate(data)
                .then(result => {
                    client.emit('message updated', result);
                    console.log("Sending Message in %s room",data.room)
                })
            }
            else
            chatService.roleMessageUpdate(data)
            .then(result => {
                // client.emit('message updated', result);
                // client.broadcast.to(data.room).emit('response', {
                //     message: data.message,
                //     author: data.author,
                //     isVisibleToClient: data.isVisibleToClient
                // });

                // broadcast message to everyone in room
                io.in(data.room).emit('message updated', result);
            })
            // client.broadcast.to(data.room).emit('response', {
            //     message: data.message,
            // });
        });

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