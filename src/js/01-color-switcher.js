const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

function startColorChange() {
  document.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

startButton.addEventListener('click', () => {
  const id = setInterval(startColorChange, 1000);
  startButton.disabled = true;
  console.log(id);
});

stopButton.addEventListener('click', () => {
  console.log(id);
});
