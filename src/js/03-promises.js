import Notiflix from 'notiflix';

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

  const delays = buildDelaysArray(params);

  const promisesArray = delays.map((delay, position) => {
    const promise = new Promise((resolve, reject) => {
      const shouldResolve = Math.random() > 0.3;
      setTimeout(() => {
        if (shouldResolve) {
          resolve(`✅ Fulfilled promise ${position + 1} in ${delay}ms`);
        } else {
          reject(`❌ Rejected promise ${position + 1} in ${delay}ms`);
        }
      }, delay);
    });

    return promise;
  });

  for (ele of promisesArray) {
    ele
      .then(a => {
        Notiflix.Notify.success(a);
      })
      .catch(err => {
        Notiflix.Notify.failure(err);
      });
  }
});

//creates array of steps from data

function buildDelaysArray({ delay, step, amount }) {
  const delays = [];
  for (let i = 0; i < amount; i++) {
    delays.push(parseInt(delay) + i * parseInt(step));
  }

  return delays;
}
Notiflix.Notify.info('Cogito ergo sum');
