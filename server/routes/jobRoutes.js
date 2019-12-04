const express = require('express');
const jobRoutes = express.Router(); 

const jobController = require('../controller/jobController');


jobRoutes.post('/', jobController.createJob);
jobRoutes.put('/:id', jobController.updateJob);
jobRoutes.get('/', jobController.getJobs);
jobRoutes.delete('/:id', jobController.deleteJob);
jobRoutes.get('/details/:id', jobController.getJobDetails);
jobRoutes.get('/:id', jobController.getAllJob);
jobRoutes.get('/userJobs/:id',jobController.getUserJobs);
jobRoutes.get('/userInfo/:id',jobController.getJobParticipantsInfo);
jobRoutes.get('/userCompletedJobs/:id',jobController.getUserCompletedJobs);
jobRoutes.post('/privateChat', jobController.createPrivateChat);
jobRoutes.get('/privateChat/:id', jobController.getPrivateChatDetails);
jobRoutes.get('/privateChatData/:jobId/:userId',jobController.getPrivateChatData)


module.exports =  jobRoutes;
