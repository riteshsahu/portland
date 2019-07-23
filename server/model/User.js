class User{
    constructor(obj){
        this.userId = (obj && obj.userId) ? obj.userId : null ; 
        this.name = (obj && obj.name) ? obj.name : null ; 
        this.email = (obj && obj.email) ? obj.email : null ; 
        this.password = (obj && obj.password) ? obj.password : null ; 
        this.role = (obj && obj.role) ? obj.role : null ; 
        this.isApproved = (obj && obj.isApproved) ? obj.isApproved : 0 ; 
        this.isProfileUpdated = (obj && obj.isProfileUpdated) ? obj.isProfileUpdated : 0 ; 
        this.createDate = (obj && obj.createDate) ? obj.createDate : null ; 
        this.createdBy = (obj && obj.createdBy) ? obj.createdBy : null ; 
        this.updateDate = (obj && obj.updateDate) ? obj.updateDate : null ; 
        this.updatedBy = (obj && obj.updatedBy) ? obj.updatedBy : null ; 
    }
}

module.exports = User;