class User{
    constructor(obj){
        this.userId = (obj && obj.userId) ? obj.userId : null ; 
        this.firstName = (obj && obj.firstName) ? obj.firstName : null ; 
        this.lastName = (obj && obj.lastName) ? obj.lastName : null;
        this.email = (obj && obj.email) ? obj.email : null ; 
        this.password = (obj && obj.password) ? obj.password : null ; 
        this.role = (obj && obj.role) ? obj.role : null ; 
        this.isActive = (obj && obj.isActive) ? obj.isActive : 0 ; 
        this.createAt = (obj && obj.createAt) ? obj.createAt : null ; 
        this.createdBy = (obj && obj.createdBy) ? obj.createdBy : null ; 
        this.updatedAt = (obj && obj.updatedAt) ? obj.updatedAt : null ; 
        this.updatedBy = (obj && obj.updatedBy) ? obj.updatedBy : null ; 
    }
}

module.exports = User;