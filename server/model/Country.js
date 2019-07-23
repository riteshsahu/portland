class Country{
    constructor(obj){
        this.id = (obj && obj.id) ? obj.id : null ; 
        this.sortName = (obj && obj.sortname) ? obj.sortname : null ;
        this.name = (obj && obj.name) ? obj.name : null ;
        this.phoneCode = (obj && obj.phoneCode) ? obj.phoneCode : null ;
    }
}

module.exports = Country;