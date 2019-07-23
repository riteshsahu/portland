class ClientCreditInfo{
    constructor(obj){
        this.declarationId = (obj && obj.declarationId) ? obj.declarationId : null ; 
        this.repName = (obj && obj.repName) ? obj.repName : null ;
        this.date = (obj && obj.date) ? obj.date : null ;
        this.broker = (obj && obj.broker) ? obj.broker : null ;
        this.sign = (obj && obj.sign) ? obj.sign : null ;
        this.userId = (obj && obj.userId) ? obj.userId : null ;
    }
}

module.exports = ClientCreditInfo;