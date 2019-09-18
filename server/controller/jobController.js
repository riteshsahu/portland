const JobService = require("../service/jobService");

class JobController {

    static createJob(req, res) {
        let data = req.body;
        JobService.createJob(data).then(result => {
            res.json(result);
            console.log(result)
        }).catch(err => {
            res.status(500)
            res.json(err)
            console.log(err)
        })
    }

    static updateJob(req, res) {
        let id = req.params.id;
        let data = req.body;
        JobService.updateJob(id, data).then(result => {
            res.json(result);
            console.log(result)
        }).catch(err => {
            res.status(500)
            res.json(err)
            console.log(err)
        })
    }
    
    static getJobs(req, res) {
        JobService.getJobs(req.query).then(result => {
            res.json(result);
            // console.log(result)
        }).catch(err => {
            res.status(500)
            res.json(err)
            console.log(err)
        })
    }

    
    static deleteJob(req, res) {
        let id = req.params.id;
        JobService.deleteJob(id).then(result => {
            res.json(result);
        }).catch(err => {
            res.status(500)
            res.json(err)
            console.log(err)
        })
    }

    static getAllJob(req, res) {
        let id = req.params.id;
        console.log("--id--all-",id);
        JobService.getAllJob(id).then(result => {
            res.json(result);
        }).catch(err => {
            res.status(500)
            res.json(err)
            console.log(err)
        })
    }

    static getUserJobs(req,res) {
        let id=req.params.id;
        console.log("--id--",id);
        JobService.getUserJobs(id).then(result => {
            res.json(result);
        }).catch(err => {
            console.log(err)
            res.status(500)
            res.json(err)
           
        })
    }

    
    static getUserCompletedJobs(req,res) {
        let id=req.params.id;
        console.log("--id--",id);
        JobService.getUserCompletedJobs(id).then(result => {
            res.json(result);
        }).catch(err => {
            console.log(err)
            res.status(500)
            res.json(err)
           
        })
    }
    static getUserLatestJobs(req,res) {
        let id=req.params.id;
        console.log("--id--",id);
        JobService.getUserLatestJobs(id).then(result => {
            res.json(result);
        }).catch(err => {
            console.log(err)
            res.status(500)
            res.json(err)
           
        })
    }
    

    static getJobParticipantsInfo(req,res) {
        let id=req.params.id;
        console.log("----ID----",id);
        JobService.getJobParticipantsInfo(id).then(result => {
            res.json(result);
        }).catch(err => {
            console.log(err)
            res.status(500)
            res.json(err)
        })
    }

}

module.exports = JobController;