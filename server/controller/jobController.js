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

}

module.exports = JobController;