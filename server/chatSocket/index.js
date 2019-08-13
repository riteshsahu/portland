// const ClientManager = require('./ClientManager')
// const ChatroomManager = require('./ChatroomManager')
// const makeHandlers = require('./handlers')

// const clientManager = ClientManager()
// const chatroomManager = ChatroomManager()

const chatService = require('../service/chatService');

function socketConnection (io) {
    io.on('connection', client => {
        client.on('subscribe', function(data) {
            chatService.subscribeUser(data)
            .then(results => {
                console.log('joining room', data.room);
                //console.log('results---1', results);
                client.join(data.room);
            })
            .catch(err => {
                console.log('error---', err)
            })
            //client.join(data.room);
        });

        client.on('send message', function(data) {
            console.log('sending room post', data.room);
            chatService.messageUpdate(data)
            .then(result => {
                console.log('final results-----', result)
                client.broadcast.to(data.room).emit('response', {
                    message: data.message,
                    author: data.author,
                    // isClientVisible: data.isClientVisible
                });
            })
            // client.broadcast.to(data.room).emit('response', {
            //     message: data.message,
            // });
        });

        client.on('disconnect', (error) => { 
            console.log("disconnected----", error) 
        });
        
        client.on('error', error => {
            console.log('error---', error)
        })
    });
}

module.exports = socketConnection;