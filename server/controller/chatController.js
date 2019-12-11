const ChatService = require("../service/chatService");
const webpush = require('web-push');
const config = require('../config/env/local');

webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    config.vapidPublicKey,
    config.vapidPrivateKey
  );

class ChatController {

    static getRoleChatHistory(req, res) {
        let id = req.params.id
        let role = req.params.role
        console.log(id, role);
        
        ChatService.getRoleChatHistory(id, role).then(result => {
            res.json(result);
        }).catch(err => {
            res.status(500).json(err)
        })
    }

    static getUserNotifications(req, res) {
        let userId = req.body.userId;
        const subscription = req.body.subscription;
        ChatService.getUserNotifications(userId).then(notifications => {
            notifications = notifications.map((dt, i) => {
                return {
                    id: dt.id,
                    msg: "You have " + dt.count + " Unread messages in " + dt.Title
                }
            });
            const payload = JSON.stringify({ title: "Portland Floor" , notifications: notifications });
            res.status(201).json(notifications);
            if (subscription && notifications.length > 0) {
                webpush.sendNotification(subscription, payload).catch(err => {
                    res.status(500).json(err);
                });
            }
        }).catch(err => {
            res.status(500).json(err);
        })
    }
}

module.exports = ChatController;