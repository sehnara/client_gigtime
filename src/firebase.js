import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyB1UuKZoQe0t4wQMS5N4b6ooQLlWaefBbE",
  authDomain: "baroalba-14460.firebaseapp.com",
  projectId: "baroalba-14460",
  storageBucket: "baroalba-14460.appspot.com",
  messagingSenderId: "572479130268",
  appId: "1:572479130268:web:600d633b1f7955bf94fb59",
  measurementId: "G-YW9DEY0J7D",
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const fetchToken = (setTokenFonud, setFcmToken) => {
  return getToken(messaging, {
    vapidKey:
      "BBIOrOvpq0Y-0o861mFSUUNfIOzthK_1juPWbrQayghnu7Fev4V9ZIB2SABu0x7lKgynEXtR40fGDBujypIH8ck",
  })
    .then((currentToken) => {
      if (currentToken) {
        setTokenFonud(true);
        setFcmToken(currentToken);
      } else {
        console.log("no token found");
        setTokenFonud(false);
        setFcmToken("");
      }
    })
    .catch((err) => {
      console.log("error occured", err);
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve();
    });
  });
