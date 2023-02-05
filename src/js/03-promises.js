const form = document.querySelector('.form');

form.addEventListener('submit', e => {
  e.preventDefault();
  const data = new FormData(e.currentTarget);
  FormData.keys(data);
  // data.forEach(ele => {
  //   console.log(ele.name);
  //   console.log(ele.value);
  // });
});

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
  } else {
    // Reject
  }
}
