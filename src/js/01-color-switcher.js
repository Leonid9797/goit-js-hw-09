let intervalId;

const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

startButton.addEventListener('click', startColor);
stopButton.addEventListener('click', stopColor);

function startColor() {
  startButton.disabled = true;
  stopButton.disabled = false;
  intervalId = setInterval(backgroundColor, 1000);
}

function stopColor() {
  startButton.disabled = false;
  stopButton.disabled = true;
  clearInterval(intervalId);
}

function backgroundColor() {
  const randomColor = getRandomHexColor();
  document.body.style.backgroundColor = randomColor;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}
