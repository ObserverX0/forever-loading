// Forever Loading Animation
// ©1998 Forever Systems Inc. — All rights reserved.

const elPercent = document.getElementById("loading-text");
const spinner = document.querySelector(".spinner");

let percent = 0;
let delay = 50; // starting delay in milliseconds

function updateLoading() {
  percent++;

  // Update displayed text
  elPercent.textContent = `Loading... ${percent}%`;

  // Logarithmic slowdown for smooth, natural deceleration
  delay = 50 + Math.log(percent + 1) * 300;

  // Cap delay (to prevent it from getting too slow)
  if (delay > 5000) delay = 5000;

  // Loop back to 0 after 99999 to avoid overflow (optional aesthetic)
  if (percent > 99999) percent = 0;

  // Animate spinner rotation speed (optional)
  spinner.style.animationDuration = `${Math.min(3 + Math.log(percent + 1) / 2, 10)}s`;

  // Continue infinitely
  setTimeout(updateLoading, delay);
}

// Start the infinite sequence
updateLoading();
