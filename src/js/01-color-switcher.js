const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
let colorChangeInterval;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}

startButton.addEventListener('click', () => {
  changeColor();
  colorChangeInterval = setInterval(changeColor, 1000);
  startButton.disabled = true;
});

stopButton.addEventListener('click', () => {
  clearInterval(colorChangeInterval);
  startButton.disabled = false;
});
