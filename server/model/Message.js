class Message{
    constructor(obj){
        this.id = (obj && obj.id) ? obj.id : null ; 
        this.message = (obj && obj.message) ? obj.message : null ; 
        this.isVisibleToClient = (obj && obj.isVisibleToClient) ? obj.isVisibleToClient : null;
        this.fileName = (obj && obj.fileName) ? obj.fileName : null;
        this.filePath = (obj && obj.filePath) ? obj.filePath : null;
        this.fileType = (obj && obj.fileType) ? obj.fileType : null;
        this.creatorId = (obj && obj.creatorId) ? obj.creatorId : null;
        this.createAt = (obj && obj.createAt) ? obj.createAt : null ; 
        this.createBy = (obj && obj.createBy) ? obj.createBy : null ; 
        this.updatedAt = (obj && obj.updatedAt) ? obj.updatedAt : null ; 
        this.updatedBy = (obj && obj.updatedBy) ? obj.updatedBy : null ; 
    }
}

module.exports = Message;