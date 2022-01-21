const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');

stopBtn.disabled = true;
startBtn.addEventListener('click', switchColor);
stopBtn.addEventListener('click', stopSwitchColor);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function switchColor() {
  interval = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  startBtn.disabled = true;
  stopBtn.disabled = false;
}

function stopSwitchColor() {
  clearInterval(interval);

  startBtn.disabled = false;
  stopBtn.disabled = true;
}
