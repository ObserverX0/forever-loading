// === Retro 90s Forever Loading Script ===

// Counter setup
let percent = 0;
const loadingText = document.getElementById('loading-text');

// Update function (every 3 seconds)
function updateLoading() {
  if (percent < 100) {
    percent++;
    loadingText.textContent = `Loading... ${percent}%`;
  } else {
    // When it reaches 100%, loop back to 0
    percent = 0;
    loadingText.textContent = `Loading... ${percent}%`;
  }
}

// Call every 3 seconds
setInterval(updateLoading, 3000);
