// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";

import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
} from "firebase/firestore/lite";

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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

async function getCities(db) {
  const citiesCol = collection(db, "cities");
  const citySnapshot = await getDoc(citiesCol);
  const cityList = citySnapshot.docs.map((doc) => doc.data());
  return cityList;
}

const messaging = getMessaging(app);
