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

const viewCountRef = ref(db, "pageViews");

// Display the initial value on page load
onValue(viewCountRef, (snapshot) => {
  const viewCount = snapshot.val() || 0;
  updateViewCount(viewCount);
});

// Check if the page has been loaded before
const hasLoadedBefore = sessionStorage.getItem("hasLoadedBefore");

// Increment the view count on page refresh
if (hasLoadedBefore) {
  // Use once() instead of onValue() to trigger the listener only once
  onValue(
    viewCountRef,
    (snapshot) => {
      const currentCount = snapshot.val() || 0;
      const updatedCount = currentCount + 1;
      set(ref(db, "pageViews"), updatedCount);
      updateViewCount(updatedCount);
    },
    { onlyOnce: true }
  );
}

// Mark the page as loaded in sessionStorage
sessionStorage.setItem("hasLoadedBefore", "true");

// Function to update the view count with "k" suffix and optional decimal places
function updateViewCount(count) {
  const viewCountElement = document.getElementById("viewCount");
  if (count >= 1000) {
    const countInK =
      count % 1000 === 0
        ? (count / 1000).toFixed(0)
        : (count / 1000).toFixed(2).replace(/\.?0+$/, "");
    viewCountElement.innerText = countInK + "k";
  } else {
    viewCountElement.innerText = count;
  }
}

// Assuming you have a reference to your Firebase app and database (similar to the previous example)
const downloadCountRefs = {};

// Initialize download counts and event listeners for each button
document.querySelectorAll(".font-down-btn").forEach((button) => {
  const countId = button.getAttribute("data-count-id");
  const countRef = ref(db, `downloadCounts/${countId}`);

  downloadCountRefs[countId] = countRef;

  onValue(countRef, (snapshot) => {
    const downloadCount = snapshot.val() || 0;
    updateDownloadCount(countId, downloadCount);

    // Add the snapshot to the downloadCountRefs object
    downloadCountRefs[countId].snapshot = snapshot;
  });

  button.addEventListener("click", function () {
    // Access the snapshot from the downloadCountRefs object
    const currentCount =
      parseInt(downloadCountRefs[countId].snapshot.val()) || 0;

    const updatedCount = currentCount + 1;

    set(downloadCountRefs[countId], updatedCount);
    updateDownloadCount(countId, updatedCount);
  });
});

// Function to update the download count with optional formatting
function updateDownloadCount(countId, count) {
  const downloadCountElement = document.getElementById(`${countId}`);
  if (downloadCountElement) {
    downloadCountElement.innerText = count;
  }
}
