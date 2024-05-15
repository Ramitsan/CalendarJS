import inputComponent from "./inputComponent.js";
import { addZero, monthsNames2 } from "./utils.js";

function dateChangeComponent(rootElement, appState, state) {
  const calendar = rootElement;
  const dateChange = calendar.querySelector('.date-change');
  const dateChangeInputDay = calendar.querySelector('.date-change__input--day');
  const dateChangeInputMonth = calendar.querySelector('.date-change__input--month');
  const dateChangeInputYear = calendar.querySelector('.date-change__input--year');
  const dateChangeButtonClear = calendar.querySelector('.date-change__button--clear');
  const monthSizer = calendar.querySelector('.input-wrap--month .sizer');
  const dateChangeWrapper = calendar.querySelector('.date-change__wrapper');
  const dateChangeLeft = calendar.querySelector('.date-change__left');
  const dateChangeRight = calendar.querySelector('.date-change__right');
  const dateChangeDots = calendar.querySelectorAll('.date-change__dot');

  dateChange.onclick = () => {
    state.isOpened = true;
    appState.activeCalendar = state.calendarName;
  }

  inputComponent(dateChangeInputDay, {
    onCheckCorrect: (valueText) => {
      const value = valueText === '' ? -1 : Number(valueText);
      return !Number.isNaN(value) && value >= -1 && value <= 31 && valueText.length <= 2;
    },
    onCheckComplete: (valueText) => {
      if (valueText.length >= 2) {
        dateChangeInputMonth.focus();
      }
    },
    onBlur: (valueText) => {
      const value = valueText === '' ? -1 : (Number(valueText) - 1);
      state.day = (!Number.isNaN(value) && value >= -1 && value <= 31) ? value : state.day;
    },
    onFocus: (valueText) => { }
  });

  inputComponent(dateChangeInputMonth, {
    onCheckCorrect: (valueText) => {
      const value = valueText === '' ? -1 : Number(valueText);
      return !Number.isNaN(value) && value >= -1 && value <= 12 && valueText.length <= 2;
    },
    onCheckComplete: (valueText) => {
      if (valueText.length >= 2) {
        dateChangeInputYear.focus();
      }
    },
    onBlur: (valueText) => {
      const value = valueText === '' ? -1 : (Number(valueText) - 1);
      state.month = Number.isNaN(value) ? state.month : value;
    },
    onFocus: (valueText) => {
      state.isNunberMonth = true;
    }
  });

  inputComponent(dateChangeInputYear, {
    onCheckCorrect: (valueText) => {
      const value = valueText === '' ? -1 : Number(valueText);
      return !Number.isNaN(value)
        && (valueText[0] == 1 || valueText[0] == 2 || valueText[0] == undefined)
        && valueText.length <= 4;
    },
    onCheckComplete: (valueText) => { },
    onBlur: (valueText) => {
      const value = valueText === '' ? -1 : (Number(valueText));
      state.year = Number.isNaN(value) ? state.year : value;
    },
    onFocus: (valueText) => { }
  });

  state.onChange.add(() => {
    dateChangeInputDay.value = (state.day != -1) ? addZero(state.day + 1) : '';
    if (state.isNunberMonth) {
      dateChangeInputMonth.value = (state.month != -1) ? addZero(state.month + 1) : '';
    } else {
      dateChangeInputMonth.value = (state.month != -1) ? monthsNames2[state.month] : '';
    }
    monthSizer.textContent = dateChangeInputMonth.value || 'ММ';
    dateChangeInputYear.value = (state.year != -1) ? state.year : '';
    const isFilled = state.day != -1 && state.month != -1 && state.year != -1 && !state.isNunberMonth;
    if (state.isOpened || isFilled) {
      dateChange.classList.add('focus-background');
    } else {
      dateChange.classList.remove('focus-background');
    }

    if (!state.isOpened) {
      dateChange.classList.add('date-change--border-bottom');
    } else {
      dateChange.classList.remove('date-change--border-bottom');
    }    

    if (isFilled && !state.isOpened) {
      dateChangeLeft.classList.add('active-background');
      dateChangeRight.classList.remove('hide-element');
      dateChangeRight.classList.add('active-background');
      dateChangeDots.forEach(dot => dot.classList.add('hide-element'));
    } else {
      dateChangeLeft.classList.remove('active-background');
      dateChangeRight.classList.add('hide-element');
      dateChangeRight.classList.remove('active-background');
      dateChangeDots.forEach(dot => dot.classList.remove('hide-element'));
    }
  })

  dateChangeButtonClear.onclick = (evt) => {
    evt.stopPropagation();
    state.day = -1;
    state.month = -1;
    state.year = -1;
    state.isOpened = false;
  }
}

export default dateChangeComponent;