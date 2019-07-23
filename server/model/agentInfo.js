class AgentInfo{
    constructor(obj){
        this.agentInfoId = (obj && obj.agentInfoId) ? obj.agentInfoId : null ; 
        this.legalName = (obj && obj.legalName) ? obj.legalName : null ; 
        this.operatingName = (obj && obj.operatingName) ? obj.operatingName : null ; 
        this.website = (obj && obj.website) ? obj.website : null ; 
        this.email = (obj && obj.email) ? obj.email : null ; 
        this.branches = (obj && obj.branches) ? obj.branches : null ; 
        this.userId = (obj && obj.userId) ? obj.userId : null ;
    }
}

module.exports = AgentInfo;

