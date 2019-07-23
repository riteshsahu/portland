class AddressInfo{
    constructor(obj){
        this.addressId = (obj && obj.addressId) ? obj.addressId : null ; 
        this.houseNo = (obj && obj.houseNo) ? obj.houseNo : null ;
        this.appartmentNo = (obj && obj.appartmentNo) ? obj.appartmentNo : null ;
        this.address = (obj && obj.address) ? obj.address : null ;
        this.city = (obj && obj.city) ? obj.city : null ;
        this.country = (obj && obj.country) ? obj.country : null ;
        this.province = (obj && obj.province) ? obj.province : null ;
        this.zipcode = (obj && obj.zipcode) ? obj.zipcode : null ;
        this.mobileOther = (obj && obj.mobileOther) ? obj.mobileOther : null ;
        this.userId = (obj && obj.userId) ? obj.userId : null ;
        this.primaryPhone = (obj && obj.primaryPhone) ? obj.primaryPhone : null;
    }
}

module.exports = AddressInfo;