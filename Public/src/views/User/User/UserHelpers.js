import { API_ROOT, URI } from "../../../../src/config/config";

function updateUserNotifcations(userId) {
    const payload = {
        userId: userId
    }
    fetch(API_ROOT + URI.GET_NOTIFICATIONS, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'content-type': 'application/json',
        }
      })
        .then(res => res.json())
        .then(data => {
          localStorage.setItem('notifications', JSON.stringify(data));
          window.dispatchEvent(new Event('storage'));
        });
}

export { updateUserNotifcations };