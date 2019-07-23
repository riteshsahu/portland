class DualProcessInfo{
    constructor(obj){
        this.dualProcessId = (obj && obj.dualProcessId) ? obj.dualProcessId : null ; 
        this.sourceName1 = (obj && obj.sourceName1) ? obj.sourceName1 : null ;
        this.type1 = (obj && obj.type1) ? obj.type1 : null ;
        this.ref1 = (obj && obj.ref1) ? obj.ref1 : null ;
        this.verificationDate1 = (obj && obj.verificationDate1) ? obj.verificationDate1 : null ;
        this.sourceName2 = (obj && obj.sourceName2) ? obj.sourceName2 : null ;
        this.type2 = (obj && obj.type2) ? obj.type2 : null ;
        this.ref2 = (obj && obj.ref2) ? obj.ref2 : null ;
        this.verificationDate2 = (obj && obj.verificationDate2) ? obj.verificationDate2 : null ;
        this.verifiedBy = (obj && obj.verifiedBy) ? obj.verifiedBy : null ;
        this.name = (obj && obj.name) ? obj.name : null ;
        this.dob = (obj && obj.dob) ? obj.dob : null ;
        this.address = (obj && obj.address) ? obj.address : null ;
        this.financeAccount = (obj && obj.financeAccount) ? obj.financeAccount : null ;
    }
}

module.exports = DualProcessInfo;