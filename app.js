let progress = 0;
const loadingText = document.getElementById("loading-text");

function updateLoading() {
  if (progress < 99) {
    progress++;
  } else {
    progress = 80; // loop back to 80% to feel infinite
  }

  loadingText.textContent = `Loading... ${progress}%`;

  // random flicker sound simulation in console
  if (Math.random() < 0.2) console.log("💾 Disk read...");

  setTimeout(updateLoading, 3000); // +1% every 3 seconds
}

window.onload = () => {
  console.log("🧠 Forever Loading System v1.0.0 (1998 Edition)");
  updateLoading();
};
