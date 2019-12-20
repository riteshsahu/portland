const ChatService = require("../service/chatService");
const webpush = require('web-push');
const config = require('../config/env/local');

webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    config.vapidPublicKey,
    config.vapidPrivateKey
  );

class ChatController {

    static getChatHistory(req, res) {
        let id = req.params.id;
        let userId = req.params.userId;
        
        ChatService.getChatHistory(id, userId).then(result => {
            res.json(result);
        }).catch(err => {
            res.status(500).json(err)
        })
    }

    static getRoleChatHistory(req, res) {
        let id = req.params.id
        let userId = req.params.userId;
        let roleId = req.params.roleId
        
        ChatService.getRoleChatHistory(id, userId, roleId).then(result => {
            res.json(result);
        }).catch(err => {
            res.status(500).json(err)
        })
    }

    static getUserNotifications(req, res) {
        let userId = req.body.userId;
        const subscription = req.body.subscription;
        ChatService.getUserNotifications(userId).then(notifications => {
            
            notifications = notifications.map((notification, i) => {
                if (notification.isMainChat) {
                    // main chat notification
                    return {
                        id: notification.jobId,
                        msg: `You have ${notification.count} unread messages in job "${notification.jobTitle}" on main chat.`,
                        link: `/activeJobs/${notification.jobId}`
                    }     
                } else {
                    // role chat notification
                    return {
                        id: `${notification.jobId}_${notification.roleId}`,
                        msg: `You have ${notification.count} unread messages in job "${notification.jobTitle}" on role tab ${notification.roleName}.`,
                        link: `/activeJobs/${notification.jobId}/roleChat/${notification.roleId}`
                    }
                }
            });
            const payload = JSON.stringify({ title: "Portland Floor" , notifications: notifications });
            if (subscription && notifications.length > 0) {
                webpush.sendNotification(subscription, payload)
                // .catch(err => {
                //     res.status(500).json(err);
                // });
            }
            res.status(201).json(notifications);
        }).catch(err => {
            res.status(500).json(err);
        })
    }
}

module.exports = ChatController;