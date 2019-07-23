class ClientInfo{
    constructor(obj){
        this.name = (obj && obj.name) ? obj.name : null ; 
        this.position = (obj && obj.position) ? obj.position : null ;
        this.telephone = (obj && obj.telephone) ? obj.telephone : null ;
        this.email = (obj && obj.email) ? obj.email : null ;
        this.userId = (obj && obj.userId) ? obj.userId : null ;
    }
}

module.exports = ClientInfo;
