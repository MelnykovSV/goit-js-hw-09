import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', e => {
  const formObject = geatherFormData(e);

  const delaysArray = buildDelaysArray(formObject);

  const promisesArray = delaysArray.map(generatePromise);

  for (promise of promisesArray) {
    promise
      .then(a => {
        Notiflix.Notify.success(a);
      })
      .catch(err => {
        Notiflix.Notify.failure(err);
      });
  }
});

function geatherFormData(e) {
  e.preventDefault();
  const data = new FormData(e.currentTarget);
  const formObject = {};

  for (item of [...data]) {
    console.log(`${item[0]} value: ${item[1]}`);
    formObject[item[0]] = item[1];
  }

  form.reset();
  return formObject;
}

//creates array of steps from data

function buildDelaysArray({ delay, step, amount }) {
  const delays = [];
  for (let i = 0; i < amount; i++) {
    delays.push(parseInt(delay) + i * parseInt(step));
  }

  return delays;
}

//generates single promise with given delay

function generatePromise(delay, position) {
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
}

// Notiflix.Notify.info('Cogito ergo sum');
