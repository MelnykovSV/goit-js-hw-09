import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const button = document.querySelector('button');

form.addEventListener('submit', e => {
  button.disabled = true;

  const formObject = geatherFormData(e);

  const delaysArray = buildDelaysArray(formObject);

  const promisesArray = delaysArray.map(generatePromise);

  alertPromises(promisesArray);
});

//geathers data from form

function geatherFormData(e) {
  e.preventDefault();
  const data = new FormData(e.currentTarget);
  const formObject = {};

  for (const item of [...data]) {
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

//generates a promise with given delay

function generatePromise(delay, position, array) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position + 1} in ${delay}ms`);
        if (position + 1 === array.length) {
          button.disabled = false;
        }
      } else {
        reject(`❌ Rejected promise ${position + 1} in ${delay}ms`);
        if (position + 1 === array.length) {
          button.disabled = false;
        }
      }
    }, delay);
  });

  return promise;
}

//Alerts promise result

function alertPromises(promisesArray) {
  for (const promise of promisesArray) {
    promise
      .then(a => {
        Notiflix.Notify.success(a);
        console.log(a);
      })
      .catch(err => {
        Notiflix.Notify.failure(err);
        console.log(err);
      });
  }
}
