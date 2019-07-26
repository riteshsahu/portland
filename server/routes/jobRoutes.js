const express = require('express');
const jobRoutes = express.Router(); 

const jobController = require('../controller/jobController');


jobRoutes.post('/', jobController.createJob);

module.exports =  jobRoutes;