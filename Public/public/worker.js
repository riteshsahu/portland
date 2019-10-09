
self.addEventListener('push', e =>{
    console.log("calling add event listner");
    const data = e.data.json();
    console.log("worker data", data);
    // self.registration.showNotification(data.title,{
    //     body: data.notification[0]
    // });
    console.log("data in show notification")
})