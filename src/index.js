import datepicker from 'js-datepicker';
import { DateTime } from 'luxon';


const picker = datepicker('#fecha', {
    formatter: (input, date) => {
        input.value = date.toLocaleDateString();
    }
});


const ahora = DateTime.now();

const display = document.getElementById("display");

