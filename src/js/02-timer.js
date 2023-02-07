import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import { convertMs } from './convertMs';
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

    if (selectedDates[0].getTime() <= Date.now()) {
      startButton.disabled = true;
      Notiflix.Notify.warning('Pick the date in the future');
      return;
    }
    targetTime = selectedDates[0].getTime();
    startButton.disabled = false;
  },
};

//Function to count time left to some date and to write it to fields
function countTime(time) {
  const timeToCount = time - Date.now();
  fields.forEach(writeTime);
  console.log(timeToCount);
  if (!Math.floor(timeToCount / 1000)) {
    clearInterval(timerID);
    Notiflix.Notify.warning('The time has come');
  }

  //Function write time to fields

  function writeTime(formField) {
    formField.querySelector('.value').textContent = convertMs(timeToCount)
      [formField.querySelector('.label').textContent.toLowerCase()].toString()
      .padStart(2, '0');
  }
}

flatpickr(datepicker, options);

startButton.addEventListener('click', () => {
  countTime(targetTime);
  timerID = setInterval(countTime, 1000, targetTime);
  startButton.disabled = true;
});
