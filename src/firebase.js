import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyB1UuKZoQe0t4wQMS5N4b6ooQLlWaefBbE",
  authDomain: "baroalba-14460.firebaseapp.com",
  projectId: "baroalba-14460",
  storageBucket: "baroalba-14460.appspot.com",
  messagingSenderId: "572479130268",
  appId: "1:572479130268:web:600d633b1f7955bf94fb59",
  measurementId: "G-YW9DEY0J7D",
};

// Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig);
