let shownNotificationsIds = [];

self.addEventListener('push', e =>{
    const data = e.data.json();

    data.notifications.forEach(notification => {
        // do not show previously shown notifications until browser re-open
        if (!shownNotificationsIds.includes(notification.id)) {
            e.waitUntil(new Promise(function (resolve, reject) {
                shownNotificationsIds.push(notification.id);

                return self.registration.showNotification(
                    data.title,
                    {
                        body: notification.msg,
                        data: notification
                    }
                )
            }));
        }
    });
});

self.addEventListener('notificationclick', function(event) {
    let url = `/activeJobs/${event.notification.data.id}`;
    
    event.notification.close();
    event.waitUntil(clients.openWindow(url));
});