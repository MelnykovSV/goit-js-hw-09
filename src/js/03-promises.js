import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const button = document.querySelector('button');

form.addEventListener('submit', e => {
  button.disabled = true;
  const formObject = geatherFormData(e);

  const delaysArray = buildDelaysArray(formObject);

  const promisesArray = delaysArray.map(generatePromise);

  alertPromise(promisesArray);
});

//geathers data from form

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

function generatePromise(delay, position, array) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position + 1} in ${delay}ms`);
        if (position + 1 === array.length) {
          console.log('this is the last promise!');
        }
      } else {
        reject(`❌ Rejected promise ${position + 1} in ${delay}ms`);
        if (position + 1 === array.length) {
          console.log('this is the last promise!');
        }
      }
    }, delay);
  });

  return promise;
}

//Alerts promise result

function alertPromise(promisesArray) {
  for (promise of promisesArray) {
    promise
      .then(a => {
        Notiflix.Notify.success(a);
      })
      .catch(err => {
        Notiflix.Notify.failure(err);
      });
    button.disabled = false;
  }
}
