import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";

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
const downloadCountRefs = new Map();

function updateViewCount(count) {
  const viewCountElement = document.getElementById("viewCount");
  if (!viewCountElement) return;
  if (count >= 1000) {
    const countInK = count % 1000 === 0 ? (count / 1000).toFixed(0) : (count / 1000).toFixed(2).replace(/\.?0+$/, "");
    viewCountElement.innerText = countInK + "k";
  } else {
    viewCountElement.innerText = count;
  }
}

function updateDownloadCount(countId, count) {
  const el = document.getElementById(countId);
  if (el) {
    el.innerHTML = count;
  }
}

function setupDownloadCounters() {
  // Remove any existing listeners to prevent duplicates
  downloadCountRefs.forEach((data, countId) => {
    if (data.off) data.off();
  });
  downloadCountRefs.clear();

  document.querySelectorAll(".font-down-btn").forEach((button) => {
    const countId = button.getAttribute("data-count-id");
    if (!countId || downloadCountRefs.has(countId)) return;
    
    const countRef = ref(db, `downloadCounts/${countId}`);
    
    const off = onValue(countRef, (snapshot) => {
      const count = snapshot.val() || 0;
      updateDownloadCount(countId, count);
      downloadCountRefs.get(countId).snapshot = snapshot;
    });
    
    downloadCountRefs.set(countId, { ref: countRef, off: off, snapshot: null });

    button.onclick = function() {
      const current = parseInt(downloadCountRefs.get(countId)?.snapshot?.val()) || 0;
      set(countRef, current + 1);
    };
  });
}

const viewCountRef = ref(db, "pageViews");
onValue(viewCountRef, (snapshot) => {
  updateViewCount(snapshot.val() || 0);
});

if (sessionStorage.getItem("hasLoadedBefore")) {
  onValue(viewCountRef, (snapshot) => {
    set(ref(db, "pageViews"), (snapshot.val() || 0) + 1);
  }, { onlyOnce: true });
}
sessionStorage.setItem("hasLoadedBefore", "true");

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupDownloadCounters);
} else {
  setupDownloadCounters();
}
window.initDownloadCounters = setupDownloadCounters;