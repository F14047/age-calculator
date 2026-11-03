import datepicker from 'js-datepicker';
import { DateTime } from 'luxon';
import './style.css';
import 'js-datepicker/dist/datepicker.min.css';

const calculator = document.getElementById("calculator");
const form = document.getElementById("age-form");
const display = document.getElementById("display");

let birthDate = null;


const picker = datepicker('#birthday', {
  // Event callbacks.
  onShow: instance => {
    console.log('Calendar showing.')
  },
  onHide: instance => {
    console.log('Calendar hidden.')
  },
  onMonthChange: instance => {
    // Show the month of the selected date.
    console.log(instance.currentMonthName)
  },

  // Customizations.
  formatter: (input, date, instance) => {
    // This will display the date as `1/1/2019`.
    input.value = date.toDateString()
  },
  position: 'tl', // Top left.
  startDay: 0, // Calendar week starts on a Sunday.
  customDays: ['S', 'M', 'T', 'W', 'Th', 'F', 'S'],
  customMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  overlayPlaceholder: 'Enter a 4-digit year',

  // Settings.
  alwaysShow: true, // Never hide the calendar.
  dateSelected: new Date(), // Today is selected.
  maxDate: new Date(), // Today.
  minDate: new Date(-753, 0, 1), // Jan 1st, 753 B.C.
  startDate: new Date(), // This month.
  showAllDates: true, // Numbers for leading & trailing days outside the current month will show.

  // ID - be sure to provide a 2nd picker with the same id to create a daterange pair.
  id: 1
})

function calculate() {
  if (!birthDate) {
    display.value("Pick a date.");
    return;
  }
  const {years, months, days} = DateTime.now().diff(birthDate, ['years', 'months', 'days']).toObject();

  display.value = `${years} : ${months} : ${Math.floor(days)}`;
}

function advancedCalculation() {

    /*
    same as calculation but with hour and minutes for more precision.
    */
}

form.addEventListener('submit', (event) => {
  event.preventDefault(); // evita que la página se recargue
  calculate();
});