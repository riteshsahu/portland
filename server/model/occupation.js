class Occupation{
    constructor(obj){
        this.occupationId = (obj && obj.occupationId) ? obj.occupationId : null ; 
        this.empName = (obj && obj.empName) ? obj.empName : null ;
        this.empEmail = (obj && obj.empEmail) ? obj.empEmail : null ;
        this.streetNo = (obj && obj.streetNo) ? obj.streetNo : null ;
        this.unitNo = (obj && obj.unitNo) ? obj.unitNo : null ;
        this.streetAdd = (obj && obj.streetAdd) ? obj.streetAdd : null ;
        this.empCity = (obj && obj.empCity) ? obj.empCity : null ;
        this.empZipcode = (obj && obj.empZipcode) ? obj.empZipcode : null ;
        this.primaryPhone = (obj && obj.primaryPhone) ? obj.primaryPhone : null ;
        this.occupationStatus = (obj && obj.occupationStatus) ? obj.occupationStatus : null ;
        this.empAddress = (obj && obj.empAddress) ? obj.empAddress : null ;
        this.country = (obj && obj.country) ? obj.country : null ;
        this.province = (obj && obj.province) ? obj.province : null ;
        this.occupation = (obj && obj.occupation) ? obj.occupation : null ;
        this.otherOccupation = (obj && obj.otherOccupation) ? obj.otherOccupation : null ;
        this.industry = (obj && obj.industry) ? obj.industry : null ;
        this.isActive = (obj && obj.isActive) ? obj.isActive : null ;
        this.occupationId = (obj && obj.occupationId) ? obj.occupationId : null ;
    }
}

module.exports = Occupation;
