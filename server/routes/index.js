const express = require('express');
const router = express.Router(); 
const userRoutes = require('./userRoutes');
const roleRoutes = require('./roleRoutes');
const jobRoutes = require('./jobRoutes');


router.get('/ping', (req, res) =>
  res.send('pong')
);
  
//router.use('/login', userRoutes);

//router.use('/login', userRoutes);
router.use('/user',userRoutes);  
router.use('/role',roleRoutes);  
router.use('/job',jobRoutes);  


module.exports = router;