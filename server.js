const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const apiRoutes = require('./server/routes');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json({limit: '100mb'}));
app.use('/api',apiRoutes);

app.use(express.static(path.join(__dirname, 'public/build')));


//production mode
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'public/build')));
    //
    app.get('*', (req, res) => {
      res.sendfile(path.join(__dirname = 'public/build/index.html'));
    })
  }
  //build mode
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/public/public/index.html'));
  })


//Route setup
app.get('/', (req, res) => {
  
  res.send('root route');
})
//Start server
app.listen(port, (req, res) => {
console.log(`server listening on port: ${port}`)
 });