const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
let colorChangeInterval;

function startColorChange() {
  document.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

startButton.addEventListener('click', () => {
  startColorChange();
  colorChangeInterval = setInterval(startColorChange, 1000);
  startButton.disabled = true;
});

stopButton.addEventListener('click', () => {
  clearInterval(colorChangeInterval);
  startButton.disabled = false;
});
