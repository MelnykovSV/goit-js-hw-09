const form = document.querySelector('.form');

form.addEventListener('submit', e => {
  e.preventDefault();
  const data = new FormData(e.currentTarget);

  for (item of [...data]) {
    console.log(`${item[0]} value: ${item[1]}`);
  }
  form.reset();
});

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
  } else {
    // Reject
  }
}
