class BusinessInfo{
    constructor(obj){
        this.businessInfoId = (obj && obj.businessInfoId) ? obj.businessInfoId : null ; 
        this.businessType = (obj && obj.businessType) ? obj.businessType : null ; 
        this.businessTypeInput = (obj && obj.businessTypeInput) ? obj.businessTypeInput : null ; 
        this.registrationPlace = (obj && obj.registrationPlace) ? obj.registrationPlace : null ; 
        this.expiryDate = (obj && obj.expiryDate) ? obj.expiryDate : null ; 
        this.bin = (obj && obj.bin) ? obj.bin : null ; 
        this.streetNo = (obj && obj.streetNo) ? obj.streetNo : null ; 
        this.unitNo = (obj && obj.unitNo) ? obj.unitNo : null ; 
        this.streetAdd = (obj && obj.streetAdd) ? obj.streetAdd : null ; 
        this.country = (obj && obj.country) ? obj.country : null ; 
        this.city = (obj && obj.city) ? obj.city : null ; 
        this.province = (obj && obj.province) ? obj.province : null ; 
        this.zipcode = (obj && obj.zipcode) ? obj.zipcode : null ; 
        this.primaryPhone = (obj && obj.primaryPhone) ? obj.primaryPhone : null ; 
        this.fax = (obj && obj.fax) ? obj.fax : null ; 
        this.userId = (obj && obj.userId) ? obj.userId : null ; 
    }
}

module.exports = BusinessInfo;


