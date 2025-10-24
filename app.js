const loadingText = document.getElementById("loading-text");

let percent = 0;
let interval = 3000; // start at 3 seconds per increment
let slowdownRate = 0.02; // how quickly it slows as numbers rise
let maxInterval = 15000; // cap it so it doesn't freeze forever

function updateLoading() {
  percent++;

  // Update display
  loadingText.textContent = `Loading... ${percent}%`;

  // Dynamic slowdown: gradually increase interval over time
  if (percent % 100 === 0 && interval < maxInterval) {
    // every 100%, make it slower
    interval += interval * slowdownRate;
    clearInterval(timer);
    timer = setInterval(updateLoading, interval);
  }

  // Add a subtle flicker effect for the 90s vibe
  if (Math.random() < 0.05) {
    loadingText.style.opacity = Math.random() * 0.8 + 0.2;
    setTimeout(() => (loadingText.style.opacity = 1), 200);
  }
}

// Begin the eternal loop
let timer = setInterval(updateLoading, interval);
