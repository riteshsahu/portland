// const ClientManager = require('./ClientManager')
// const ChatroomManager = require('./ChatroomManager')
// const makeHandlers = require('./handlers')

// const clientManager = ClientManager()
// const chatroomManager = ChatroomManager()

function socketConnection (io) {
    io.on('connection', client => {
        
        // client.on('event', data => { 
        //     console.log("data----", data)
        //     client.emit('response', data);
        // });
        client.on('subscribe', function(room) {
            console.log('joining room', room);
            client.join(room);
        });

        client.on('send message', function(data) {

            console.log('sending room post', data.room);
            client.to(data.room).emit('response', {
                message: data.message
            });
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