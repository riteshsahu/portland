class BusinessStructure{
    constructor(obj){
        this.businessStructureId = (obj && obj.businessStructureId) ? obj.businessStructureId : null ; 
        this.gic = (obj && obj.gic) ? obj.gic : 0 ; 
        this.mutualFunds = (obj && obj.mutualFunds) ? obj.mutualFunds : 0 ; 
        this.securities = (obj && obj.securities) ? obj.securities : 0 ; 
        this.insurance = (obj && obj.insurance) ? obj.insurance : 0 ; 
        this.ppn = (obj && obj.ppn) ? obj.ppn : 0 ; 
        this.mortgage = (obj && obj.mortgage) ? obj.mortgage : 0 ; 
        this.other = (obj && obj.other) ? obj.other : 0 ; 
        this.gicInput = (obj && obj.gicInput) ? obj.gicInput : null ; 
        this.mutualFundsInput = (obj && obj.mutualFundsInput) ? obj.mutualFundsInput : null ; 
        this.securitiesInput = (obj && obj.securitiesInput) ? obj.securitiesInput : null ; 
        this.insuranceInput = (obj && obj.insuranceInput) ? obj.insuranceInput : null ; 
        this.ppnInput = (obj && obj.ppnInput) ? obj.ppnInput : null ; 
        this.mortgageInput = (obj && obj.mortgageInput) ? obj.mortgageInput : null ; 
        this.otherInput = (obj && obj.otherInput) ? obj.otherInput : null ; 
        this.rdba = (obj && obj.rdba) ? obj.rdba : 0 ; 
        this.mfda = (obj && obj.mfda) ? obj.mfda : 0 ; 
        this.iiroc = (obj && obj.iiroc) ? obj.iiroc : 0 ; 
        this.mga = (obj && obj.mga) ? obj.mga : 0 ; 
        this.userId = (obj && obj.userId) ? obj.userId : null ;        
    }
}

module.exports = BusinessStructure;

