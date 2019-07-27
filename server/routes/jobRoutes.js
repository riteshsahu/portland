const express = require('express');
const jobRoutes = express.Router(); 

const jobController = require('../controller/jobController');


jobRoutes.post('/', jobController.createJob);
jobRoutes.put('/:id', jobController.updateJob);
jobRoutes.get('/', jobController.getJobs);


module.exports =  jobRoutes;
