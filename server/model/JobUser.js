class JobUser{
    constructor(obj){
        this.id = (obj && obj.id) ? obj.id : null ; 
        this.jobId = (obj && obj.jobId) ? obj.jobId : null ; 
        this.userId = (obj && obj.userId) ? obj.userId : null;
        this.isActive = (obj && obj.isActive) ? obj.isActive : 0;
        this.isSubscribed = (obj && obj.isSubscribed) ? obj.isSubscribed : 0;
        this.createAt = (obj && obj.createAt) ? obj.createAt : null ; 
        this.createdBy = (obj && obj.createdBy) ? obj.createdBy : null ; 
        this.updatedAt = (obj && obj.updatedAt) ? obj.updatedAt : null ; 
        this.updatedBy = (obj && obj.updatedBy) ? obj.updatedBy : null ; 
    }
}

module.exports = JobUser;