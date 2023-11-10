import { app, db } from "./firebase-init.js";

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
    console.log("Button clicked");

    // Access the snapshot from the downloadCountRefs object
    const currentCount =
      parseInt(downloadCountRefs[countId].snapshot.val()) || 0;

    const updatedCount = currentCount + 1;
    console.log("Updated count:", updatedCount);

    set(downloadCountRefs[countId], updatedCount);
    updateDownloadCount(countId, updatedCount);
  });
});

// Function to update the download count with optional formatting
function updateDownloadCount(countId, count) {
  const downloadCountElement = document.getElementById(`${countId}`);
  if (downloadCountElement) {
    downloadCountElement.innerText = count + " download(s)";
  }
}
