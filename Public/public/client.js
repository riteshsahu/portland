// export const API_ROOT = 'https://portland-web.herokuapp.com/api/';
const API_ROOT = 'http://localhost:5000/api/';	// TODO: change API_ROOT when in production
const GET_NOTIFICATIONS = "chat/notification";
const publicVapidKey = "BJSb4Xhcs8_ZPa0Qu4epmDeU9GBj4E8BrDjFZebMZBMHBqP4HyAW-bGleVlnX7N9Qnlj4uPUGGxzYj9F_-4xq2Q";

(async function () {
	await new Promise(resolve => setTimeout(resolve, 5000));

	if (window.Notification && 'serviceWorker' in navigator && 'PushManager' in window) {
		Notification.requestPermission(() => {
			if (Notification.permission === 'granted') {
				setInterval(function () {
					send().catch(err => {
						console.log(err);
					});
				}, 60000)
				send().catch(err => {
					console.log(err);
				});
			}
		});
	}
})();

async function send() {
	console.log('Registering service worker');
	const register = await navigator.serviceWorker.register('/worker.js', {
		scope: '/'
	});
	console.log('Service worker registered..');

	// registering push
	
	console.log("subscribing.......");
	await navigator.serviceWorker.ready;
	const subscription = await register.pushManager.subscribe({
		userVisibleOnly: true,
		applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
	});

	console.log("Getting notifications.....");
	//Send push notification
	const user = JSON.parse(localStorage.getItem('userDetails'));

	if (user) {
		const payload = {
			subscription: subscription,
			userId: user[0].userId
		}
		
		await fetch(API_ROOT + GET_NOTIFICATIONS, {
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
}

function urlBase64ToUint8Array(base64String) {
	const padding = '='.repeat((4 - base64String.length % 4) % 4);
	const base64 = (base64String + padding)
		.replace(/-/g, '+')
		.replace(/_/g, '/');
	const rawData = window.atob(base64);
	const outputArray = new Uint8Array(rawData.length);
	for (let i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i);
	}
	return outputArray;
}