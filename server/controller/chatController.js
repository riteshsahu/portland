const ChatService = require("../service/chatService");
const webpush = require('web-push');
const config = require('../config/env/local');

webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    config.vapidPublicKey,
    config.vapidPrivateKey
  );

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

    static getUserNotifications(req, res) {
        let id = req.body.id;
        const subscription = req.body;
        ChatService.getUserNotifications(id).then(notification => {
            res.status(201).json({ 'msg': notification });
            const payload = JSON.stringify({ title: "Notification" , notification : notification })
            webPush.sendNotification(subscription, payload).catch(err => {
                res.status(500);
            })
        }).catch(err => {
            res.status(500)
            res.json(err)
        })
    }
}

module.exports = ChatController;



