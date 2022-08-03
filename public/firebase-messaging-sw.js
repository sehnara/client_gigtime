importScripts("https://www.gstatic.com/firebasejs/8.7.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.7.1/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyB1UuKZoQe0t4wQMS5N4b6ooQLlWaefBbE",
  authDomain: "baroalba-14460.firebaseapp.com",
  projectId: "baroalba-14460",
  storageBucket: "baroalba-14460.appspot.com",
  messagingSenderId: "572479130268",
  appId: "1:572479130268:web:600d633b1f7955bf94fb59",
  measurementId: "G-YW9DEY0J7D",
};

const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// messaging.setBackgroundMessageHandler(function (payload) {
//   console.log(
//     "[firebase-messaging-sw.js] Received background message ",
//     payload
//   );
//   // Customize notification here
//   const notificationTitle = payload.data.title;
//   const notificationOptions = {
//     body: payload.data.body,
//     title: payload.data.title,
//   };
let worker_id = 0;
let angel_id = 0;

messaging.onBackgroundMessage(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
  };
  worker_id = JSON.parse(payload.data.body).worker_id;
  angel_id = JSON.parse(payload.data.body).angel_id;

  self.registration.showNotification(notificationTitle, {
    body: `${
      notificationOptions.body.split('"')[3]
    }에서 알바생을 급하게 찾고 있습니다!`,
  });
});

// self.addEventListener("push", function (e) {
//   const notificationTitle = payload.data.title;
//   const notificationOptions = {
//     body: payload.data.body,
//   };

//   self.registration.showNotification(notificationTitle, {
//     body: `${
//       notificationOptions.body.split('"')[3]
//     }에서 알바생을 급하게 찾고 있습니다!`,
//   });
// });
self.addEventListener("notificationclick", function (event) {
  const url = `https://heobo.shop/worker/AngelResult?worker_id=${worker_id}&angel_id=${angel_id}`;
  event.notification.close();
  event.waitUntil(clients.openWindow(url));
});
