import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue,
  set,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDjxDYOibsn7Au_YOqgI7AoVYFD5KQ7HxI",
  authDomain: "font-web-view.firebaseapp.com",
  databaseURL: "https://font-web-view-default-rtdb.firebaseio.com",
  projectId: "font-web-view",
  storageBucket: "font-web-view.appspot.com",
  messagingSenderId: "735661352679",
  appId: "1:735661352679:web:f5ed55c030380697c9e442",
  measurementId: "G-14K7TDNX63",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
