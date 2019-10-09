// const ClientManager = require('./ClientManager')
// const ChatroomManager = require('./ChatroomManager')
// const makeHandlers = require('./handlers')

// const clientManager = ClientManager()
// const chatroomManager = ChatroomManager()

const chatService = require('../service/chatService');

function socketConnection (io) {
    io.on('connection', client => {
        client.on('subscribe', function(data) {
            if (data.privateChat == true) {
                chatService.subscribePrivateUser(data)
                .then(results => {
                    console.log("joining Room",data.room)
                    client.join(data.room);
                })
            }
            else
            chatService.subscribeUser(data)
            .then(results => {
                client.join(data.room);
            })
            .catch(err => {
                console.log('error', err)
            })
            //client.join(data.room);
        });

        client.on('send message', function(data) {            
            if (data.privateChat == true) {
                chatService.privateMessageUpdate(data)
                .then(results => {
                    console.log("Sending Message",data.room)
                    client.join(data.room);
                })
            }
            else
            chatService.messageUpdate(data)
            .then(result => {
                client.broadcast.to(data.room).emit('response', {
                    message: data.message,
                    author: data.author,
                    isVisibleToClient: data.isVisibleToClient
                });
            })
            // client.broadcast.to(data.room).emit('response', {
            //     message: data.message,
            // });
        });

        client.on('disconnect', (error) => { 
            console.log("disconnected", error) 
        });
        
        client.on('error', error => {
            console.log('error', error)
        })
    });
}

module.exports = socketConnection;