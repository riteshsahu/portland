class ClientCreditInfo{
    constructor(obj){
        this.creditFileId = (obj && obj.creditFileId) ? obj.creditFileId : null ; 
        this.bureauName = (obj && obj.bureauName) ? obj.bureauName : null ;
        this.inquiryDate = (obj && obj.inquiryDate) ? obj.inquiryDate : null ;
        this.refInquiry = (obj && obj.refInquiry) ? obj.refInquiry : null ;
        this.userId = (obj && obj.userId) ? obj.userId : null ;
    }
}

module.exports = ClientCreditInfo;