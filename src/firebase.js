// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB2nC8DTax1nHlhlH8WvOqcQclO4a6lF_A",
  authDomain: "admitsextra-waitlist.firebaseapp.com",
  databaseURL: "https://admitsextra-waitlist-default-rtdb.firebaseio.com",
  projectId: "admitsextra-waitlist",
  storageBucket: "admitsextra-waitlist.firebasestorage.app",
  messagingSenderId: "552263956236",
  appId: "1:552263956236:web:cc8de0447d7465ee46fb29",
  measurementId: "G-7LD57QWGJF"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database }; // Only export database
