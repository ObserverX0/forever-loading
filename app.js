// Eternal loader: infinite percent, dynamic delay based on digits, spinner synced
const elPercent = document.getElementById('percent');
const elStatus = document.getElementById('status');
const elProgress = document.querySelector('.progress');

if (!elPercent || !elStatus || !elProgress) {
  console.error('Required DOM nodes missing.');
} else {
  let percent = 0;

  // compute delay from number of digits:
  // digits <=3  => 3s
  // digits =4   => 4s (>=1000)
  // digits =5   => 5s (>=10000)
  // digits =6   => 6s, etc.
  function delayFor(value) {
    const digits = Math.max(1, Math.floor(Math.log10(Math.max(1, value))) + 1);
    // base is 3s for up to 3 digits
    const extra = Math.max(0, digits - 3);
    const delaySec = 3 + extra; // 3 + (digits-3)
    // clamp to a sane max so it doesn't freeze forever (you can raise it)
    return Math.min(delaySec * 1000, 60000); // cap 60s per increment
  }

  // set CSS spin duration to feel synced: shorter than delay but proportional
  function syncSpinner(delayMs) {
    const spinSec = Math.max(1, Math.round((delayMs / 1000) * 0.6)); // 60% of delay, min 1s
    document.documentElement.style.setProperty('--spin-duration', spinSec + 's');
  }

  function render() {
    // localized with grouping to keep it readable
    elPercent.textContent = `Loading... ${percent.toLocaleString()}%`;
  }

  // small randomized flicker and status text variance for 90s energy
  function maybeFlicker() {
    if (Math.random() < 0.08) {
      elPercent.style.opacity = (Math.random() * 0.6 + 0.4).toFixed(2);
      setTimeout(() => elPercent.style.opacity = '', 150);
    }
    // occasional cheeky status change (very rare)
    if (Math.random() < 0.02) {
      elStatus.textContent = ['Please wait.', 'Still loading.', 'Hold on...', 'Processing...'][Math.floor(Math.random() * 4)];
      setTimeout(() => elStatus.textContent = 'Please wait.', 1800);
    }
  }

  // update visual circular arc (we rotate the progress element according to percent%100)
  function syncArc() {
    const deg = (percent % 100) * 3.6; // 0-360
    elProgress.style.transform = `rotate(${deg}deg)`;
  }

  // main loop: schedule iterative increments with dynamic delay
  async function loop() {
    while (true) {
      percent++;
      render();
      syncArc();

      // get delay based on number of digits
      const delayMs = delayFor(percent);
      syncSpinner(delayMs);

      maybeFlicker();

      // wait
      await new Promise(res => setTimeout(res, delayMs));
    }
  }

  // start (after load)
  window.addEventListener('load', () => {
    render();
    syncArc();
    syncSpinner(delayFor(percent));
    loop().catch(err => console.error(err));
  });
}
