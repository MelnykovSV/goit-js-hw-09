import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

let targetTime;

const datepicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const fields = document.querySelectorAll('.field');
let timerID;
startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  //Function to pick date and to check if it is in future
  onClose(selectedDates) {
    //Resets old timer if datepicker was used in the middle of process of counting
    clearInterval(timerID);
    fields.forEach(field => {
      field.querySelector('.value').textContent = '00';
    });

    //Picks the date if it is in future

    if (selectedDates[0].getTime() < Date.now()) {
      startButton.disabled = true;
      alert('Pick the date in the future');
      return;
    } else {
      targetTime = selectedDates[0].getTime();
      startButton.disabled = false;
    }
  },
};

flatpickr(datepicker, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

//Function to count time left to some date and to write it to fields
function countTime(time) {
  const timeToCount = time - Date.now();
  if (Math.floor(timeToCount / 1000)) {
    console.log(timeToCount);
    fields.forEach(field => {
      field.querySelector('.value').textContent = convertMs(timeToCount)
        [field.querySelector('.label').textContent.toLowerCase()].toString()
        .padStart(2, '0');
    });
  } else {
    console.log(`This is the time: ${timeToCount}`);
    fields.forEach(field => {
      field.querySelector('.value').textContent = convertMs(timeToCount)
        [field.querySelector('.label').textContent.toLowerCase()].toString()
        .padStart(2, '0');
    });
    console.log(`Final time ${Math.floor(timeToCount / 1000)}`);
    console.log(
      `Should be in value: ${convertMs(timeToCount)
        [fields[3].querySelector('.label').textContent.toLowerCase()].toString()
        .padStart(2, '0')}`
    );
    clearInterval(timerID);
    setTimeout(Notiflix.Notify.warning('The time has come'), 1000);
  }
}

// Start time on click

startButton.addEventListener('click', () => {
  countTime(targetTime);
  timerID = setInterval(countTime, 1000, targetTime);
});
