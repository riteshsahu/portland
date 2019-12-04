const JobService = require("../service/jobService");

class JobController {

    static createJob(req, res) {
        let data = req.body;
        JobService.createJob(data).then(result => {
            res.json(result);
        }).catch(err => {
            res.status(500)
            res.json(err)
        })
    }

    static createPrivateChat(req, res) {
        let data = req.body;
        JobService.createPrivateChat(data).then(result => {
            res.json(result);
        }).catch(err => {
            res.status(500)
            res.json(err)
        })
    }
    

    static updateJob(req, res) {
        let id = req.params.id;
        let data = req.body;
        JobService.updateJob(id, data).then(result => {
            res.json(result);
        }).catch(err => {
            res.status(500)
            res.json(err)
        })
    }
    
    static getJobs(req, res) {
        JobService.getJobs(req.query).then(result => {
            res.json(result);
        }).catch(err => {
            res.status(500)
            res.json(err)
        })
    }

    
    static deleteJob(req, res) {
        let id = req.params.id;
        JobService.deleteJob(id).then(result => {
            res.json(result);
        }).catch(err => {
            res.status(500)
            res.json(err)
        })
    }

    static getAllJob(req, res) {
        let id = req.params.id;
        JobService.getAllJob(id).then(result => {
            res.json(result);
        }).catch(err => {
            res.status(500)
            res.json(err)
        })
    }

    static getUserJobs(req,res) {
        let id=req.params.id;
        JobService.getUserJobs(id).then(result => {
            res.json(result);
        }).catch(err => {
            res.status(500)
            res.json(err)
           
        })
    }

    
    static getUserCompletedJobs(req,res) {
        let id=req.params.id;
        JobService.getUserCompletedJobs(id).then(result => {
            res.json(result);
        }).catch(err => {
            res.status(500)
            res.json(err)
        })
    }
    

    static getJobParticipantsInfo(req,res) {
        let id=req.params.id;
        JobService.getJobParticipantsInfo(id).then(result => {
            res.json(result);
        }).catch(err => {
            res.status(500)
            res.json(err)
        })
    }

    static getPrivateChatData(req, res) {
        let jobId = req.params.jobId;
        let userId = req.params.userId;
        JobService.getPrivateChatData(jobId,userId).then(result => {
            res.json(result);
        }).catch(err => {
            res.status(500)
            res.json(err)
        })
    }

    static getJobDetails(req, res) {
        let id = req.params.id;
        JobService.getJobDetails(id).then(result => {
            res.json(result);
        }).catch(err => {
            res.status(500)
            res.json(err)
        })
    }

    static getPrivateChatDetails(req, res) {
        let id = req.params.id;
        JobService.getPrivateChatDetails(id).then(result => {
            res.json(result);
        }).catch(err => {
            res.status(500)
            res.json(err)
        })
    }

}

module.exports = JobController;