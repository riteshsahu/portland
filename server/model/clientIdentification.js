class IdentificationInfo{
    constructor(obj){
        this.identificationId = (obj && obj.identificationId) ? obj.identificationId : null ; 
        this.fullName1 = (obj && obj.fullName1) ? obj.fullName1 : null;
        this.issueDate1 = (obj && obj.issueDate1) ? obj.issueDate1 : null ;
        this.idType1 = (obj && obj.idType1) ? obj.idType1 : null ;
        this.expiryDate1 = (obj && obj.expiryDate1) ? obj.expiryDate1 : null ;
        this.issuingAuthority1 = (obj && obj.issuingAuthority1) ? obj.issuingAuthority1 : null ;
        this.idNo1 = (obj && obj.idNo1) ? obj.idNo1 : null ;
        this.fullName2 = (obj && obj.fullName2) ? obj.fullName2 : null;
        this.issueDate2 = (obj && obj.issueDate2) ? obj.issueDate2 : null ;
        this.idType2 = (obj && obj.idType2) ? obj.idType2 : null ;
        this.expiryDate2 = (obj && obj.expiryDate2) ? obj.expiryDate2 : null ;
        this.issuingAuthority2 = (obj && obj.issuingAuthority2) ? obj.issuingAuthority2 : null ;
        this.idNo2 = (obj && obj.idNo2) ? obj.idNo2 : null ;
        this.userId = (obj && obj.userId) ? obj.userId : null;
    }
}

module.exports = IdentificationInfo;