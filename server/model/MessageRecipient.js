class MessageRecipient{
    constructor(obj){
        this.id = (obj && obj.id) ? obj.id : null ; 
        this.recipientId = (obj && obj.recipientId) ? obj.recipientId : null ; 
        this.recipientGroupId = (obj && obj.recipientGroupId) ? obj.recipientGroupId : null;
        this.messageId = (obj && obj.messageId) ? obj.messageId : null ; 
        this.isRead = (obj && obj.isRead) ? obj.isRead : 0 ; 
        this.createAt = (obj && obj.createAt) ? obj.createAt : null ; 
        this.createdBy = (obj && obj.createdBy) ? obj.createdBy : null ; 
        this.updatedAt = (obj && obj.updatedAt) ? obj.updatedAt : null ; 
        this.updatedBy = (obj && obj.updatedBy) ? obj.updatedBy : null ; 
    }
}

module.exports = MessageRecipient;