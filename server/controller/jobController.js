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
            console.log(result)
        }).catch(err => {
            res.status(500)
            res.json(err)
            console.log(err)
        })
    }


}

module.exports = JobController;