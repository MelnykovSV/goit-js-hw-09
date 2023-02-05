const form = document.querySelector('.form');

form.addEventListener('submit', e => {
  e.preventDefault();
  const data = new FormData(e.currentTarget);
  const params = {};

  for (item of [...data]) {
    console.log(`${item[0]} value: ${item[1]}`);
    params[item[0]] = item[1];
  }

  form.reset();

  buildDelaysArray(params);
});

//creates array of steps from data

function buildDelaysArray({ delay, step, amount }) {
  const delays = [];
  for (let i = 0; i < amount; i++) {
    delays.push(delay + i * step);
  }
  console.log(delays);
  console.log(delays.length);
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      // Fulfill
      resolve('success value');
    } else {
      // Reject
      reject('error');
    }
  });
}

createPromise('position', 'delay')
  .then(a => {
    console.log(a);
  })
  .catch(err => {
    console.log(err);
  });
