const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const http = require('http');
const server = http.createServer(app);
const WebSocket = require('socket.io')(server);
const cors = require('cors');


const apiRoutes = require('./server/routes');
const socket = require('./server/chatSocket');
const webpush = require('web-push');

app.use(cors());
app.use(bodyParser.json({limit: '100mb'}));
app.use('/api', apiRoutes);

app.use(express.static(path.join(__dirname, 'Public/build')));


//const wss = new WebSocket.Server({ server });
socket(WebSocket);

// webpush.setVapidDetails(
//   'mailto:myuserid@email.com',
//   vapidKeys.publicKey,
//   vapidKeys.privateKey
// )


//production mode
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'Public/build')));
    //
    app.get('*', (req, res) => {
      res.sendfile(path.join(__dirname = 'Public/build/index.html'));
    })
  }
  //build mode
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/Public/public/index.html'));
  })


//Route setup
app.get('/', (req, res) => {
  
  res.send('root route');
})
//Start server
server.listen(port, (req, res) => {
console.log(`server listening on port: ${port}`)
 });