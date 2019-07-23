class ClientInfo{
    constructor(obj){
        this.clientInfoId = (obj && obj.clientInfoId) ? obj.clientInfoId : null ; 
        this.initials = (obj && obj.initials) ? obj.initials : null ;
        this.title = (obj && obj.title) ? obj.title : null ;
        this.firstName = (obj && obj.firstName) ? obj.firstName : null ;
        this.lastName = (obj && obj.lastName) ? obj.lastName : null ;
        this.sin = (obj && obj.sin) ? obj.sin : null ;
        this.dob = (obj && obj.dob) ? obj.dob : null ;
        this.poa = (obj && obj.poa) ? obj.poa : null ;
        this.poaFormPath = (obj && obj.poaFormPath) ? obj.poaFormPath : null ;
        this.userId = (obj && obj.userId) ? obj.userId : null ;
    }
}

module.exports = ClientInfo;
