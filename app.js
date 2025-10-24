// Raw forever-loading logic
// increments by 1 every 500ms and continues past 100% forever.

(function(){
  const el = document.getElementById('loadingText');

  // start value (0)
  let value = 0;

  // human-readable thousand separators
  function format(n){
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // render
  function render(){
    el.textContent = `Loading... ${format(value)}%`;
  }
  render();

  // increment interval (0.5s per percent)
  const STEP_MS = 500; // change to 200 for fast testing

  setInterval(() => {
    value++;
    render();
  }, STEP_MS);

  // occasional micro-stutter to make it imperfect (raw feel)
  // every ~45-90 seconds, freeze spinner briefly by toggling animation-play-state
  setInterval(() => {
    const spinner = document.querySelector('.spinner');
    if(!spinner) return;
    spinner.style.animationPlayState = 'paused';
    // short pause 150ms - feels like ancient lag
    setTimeout(() => spinner.style.animationPlayState = 'running', 150);
  }, 60000 + Math.floor(Math.random()*30000)); // between 60s and 90s
})();
