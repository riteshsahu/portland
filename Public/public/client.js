export const API_ROOT = 'https://portland-web.herokuapp.com/api/';
// const API_ROOT = 'http://localhost:5000/api/';
const GET_NOTIFICATIONS = "chat/notification";
const publicVapidKey = "BJSb4Xhcs8_ZPa0Qu4epmDeU9GBj4E8BrDjFZebMZBMHBqP4HyAW-bGleVlnX7N9Qnlj4uPUGGxzYj9F_-4xq2Q";

if ('serviceWorker' in navigator) {
  setInterval(function () {
    console.log("calling...")
    send().catch(err => {
      console.log(err);
    })
  }, 60000)
}

async function send() {
  console.log('Registering service worker');
  const register = await navigator.serviceWorker.register('/worker.js', {
    scope: '/'
  });
  console.log('Service worker registered..');
  // registering push
  const subsription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  });

  console.log("Push registered.....");
  //Send push notification
  const user = JSON.parse(localStorage.getItem('userDetails'));
  let value = {
    userVisibleOnly: subsription.options.userVisibleOnly,
    applicationServerKey: subsription.options.applicationServerKey,
    id: user[0].userId
  }
  if (user) {
    console.log("Push registered.....");
    //Send push notification

    await fetch(API_ROOT + GET_NOTIFICATIONS, {
      method: 'POST',
      body: JSON.stringify(value),
      headers: {
        'content-type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(data => {
        let messages = []
        if (data.msg.length > 0) {
          data.msg.map((dt, i) => {
            messages.push(
              "You have " + dt.count + " Unread messages in " + dt.Title
              // {
              //   id : dt.id,
              //   msg: "You have " + dt.count + " Unread messages in " + dt.Title
              // }
              )
          })
          oldMessages = JSON.parse(localStorage.getItem('notifications'));
          if (oldMessages) {
            console.log("messages-----");
            for (let i = 0; i < messages.length; i++) {
              /////////////////////////
            //   function isExist(id, jobArr) {
            //     if (jobArr.length > 0) {
            //         let keyIndex, count = 0;
            //         jobArr.map((dt, index) => {
            //             if (dt.jobId == id) {
            //                 count = count + 1;
            //                 keyIndex = index;
            //             }
            //         })
            //         if (count > 0) {
            //             return keyIndex;
            //         } else {
            //             return "NOT_EXIST"
            //         }
            //     } else {
            //         return "NOT_EXIST"
            //     }
            // }
            // let jobList = [];
            // if (result.length > 0) {
    
            //     result.map((dt, i) => {
            //         if (isExist(dt.jobId, jobList) == "NOT_EXIST") {
            //             jobList.push({
            //                 jobTitle: dt.jobTitle,
            //                 jobId: dt.jobId,
            //             })
            //         } else {
                       
            //         }
            //     })
            //     return jobList;
            // }
            // else {
            //     return result;
            // }
        ///////////////////////////////

              oldMessages.push(messages[i]);
            }
            localStorage.setItem('notifications', JSON.stringify(oldMessages));
          } else {
            console.log("messages---", messages);
            localStorage.setItem('notifications', JSON.stringify(messages));
          }
        }
      })
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




