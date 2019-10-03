const ChatService = require("../service/chatService");

class ChatController {
    static getMessageHistory(req, res) {
        let id = req.params.id
        ChatService.getMessageHistory(id).then(result => {
            res.json(result);
        }).catch(err => {
            res.status(500)
            res.json(err)
        })
    }

}

module.exports = ChatController;