
function socketConnection (wss, WebSocket) {
    wss.on('connection', function connection(ws) {
    console.log('ws---', ws);
    ws.on('message', function incoming(data) {
      console.log('data---', data)
      wss.clients.forEach(function each(client) {
        console.log('clients----', client)
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
    });
  });
}

module.exports = socketConnection;