importScripts("https://www.gstatic.com/firebasejs/9.0.0/firbase-app-compat.js");
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firbase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyB1UuKZoQe0t4wQMS5N4b6ooQLlWaefBbE",
  authDomain: "baroalba-14460.firebaseapp.com",
  projectId: "baroalba-14460",
  storageBucket: "baroalba-14460.appspot.com",
  messagingSenderId: "572479130268",
  appId: "1:572479130268:web:600d633b1f7955bf94fb59",
  measurementId: "G-YW9DEY0J7D",
});

const messaging = firbase.messaging();
messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };
  self.ServiceWorkerRegistration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
