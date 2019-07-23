class ResidenceInfo{
    constructor(obj){
        this.residenceId = (obj && obj.residenceId) ? obj.residenceId : null ; 
        this.canadian = (obj && obj.canadian) ? obj.canadian : null;
        this.usResident = (obj && obj.usResident) ? obj.usResident : null ;
        this.issueDate1 = (obj && obj.issueDate1) ? obj.issueDate1 : null ;
        this.citizenship = (obj && obj.citizenship) ? obj.citizenship : null ;
        this.country = (obj && obj.country) ? obj.country : null ;
        this.province = (obj && obj.province) ? obj.province : null ;
        this.tin = (obj && obj.tin) ? obj.tin : null;
        this.acAnEntity = (obj && obj.acAnEntity) ? obj.acAnEntity : null ;
        this.CRAform = (obj && obj.CRAform) ? obj.CRAform : null ;
        this.CRAFormPath = (obj && obj.CRAFormPath) ? obj.CRAFormPath : null ;
        this.tinReason = (obj && obj.tinReason) ? obj.tinReason : null ;
        this.tinReasonInput = (obj && obj.tinReasonInput) ? obj.tinReasonInput : null ;
        this.userId = (obj && obj.userId) ? obj.userId : null;
    }
}

module.exports = IdentificationInfo;