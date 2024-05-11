const daysCountOfMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const daysCountOfLeap = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const currentYear = 2024;
const currentYearStart = 0;

const isLeapYear = (year) => {
  return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
}

const getYearStart = (year) => {
  const yearDiff = year - currentYear;
  let days = 0;

  for (let i = 0; i < Math.abs(yearDiff); i++) {
    if (yearDiff < 0) {
      days += isLeapYear(currentYear + (-i - 1)) ? 364 : 365;
      days -= 2;
    } else {
      days += isLeapYear(currentYear + i) ? 366 : 365;
    }
  }
  return (days + currentYearStart) % 7;
}


const getMonthStart = (year, month) => {
  const yearStart = getYearStart(year);

  let days = 0;

  for (let i = 0; i < month; i++) {
    days += isLeapYear(year) ? daysCountOfLeap[i] : daysCountOfMonth[i];

  }
  return (days + yearStart) % 7;
}


function daysComponent(rootElement, appState, state) {
  const daysList = rootElement.querySelector('.days-list');

  [...daysList.children].forEach((item, index) => {
    item.onclick = () => {
      state.day = index;
    }
  });

  appState.onChange.add(() => {
    if (state.month == -1 || !state.isOpened) {
      rootElement.classList.add('hide-element');
    } else {
      rootElement.classList.remove('hide-element');
    }

    const firstDay = getMonthStart(state.year, state.month);
    daysList.style.setProperty('--first-day', firstDay);
    if (firstDay == 0) {
      daysList.classList.add('days-list--hide-before');
    } else {
      daysList.classList.remove('days-list--hide-before');
    }
    const monthDays = (isLeapYear(state.year) ? daysCountOfLeap : daysCountOfMonth)[state.month];
    const lastDay = (firstDay + monthDays) % 7;
    daysList.style.setProperty('--last-day', lastDay);

    [...daysList.children].forEach((item, index) => {
      if (index >= monthDays) {
        item.style.display = 'none';
      } else {
        item.style.display = '';
      }
    });

    [...daysList.children].forEach((item, index) => {
      const isFrom = (state.month == appState.stateSelectedFrom.month && state.year == appState.stateSelectedFrom.year);
      const isSameMonth = (appState.stateSelectedFrom.month == appState.stateSelectedTo.month) && ((appState.stateSelectedFrom.year == appState.stateSelectedTo.year));
      const isDaysSelected = appState.stateSelectedFrom.day != -1 && appState.stateSelectedTo.day != -1;
      if ((appState.stateSelectedFrom.day == index && isFrom) || (appState.stateSelectedTo.day == index
        && (!isFrom || isSameMonth))) {
        item.classList.add('day--selected');
      } else {
        item.classList.remove('day--selected');
      }
      const inIntervalSameMonth = (appState.stateSelectedFrom.day < index)
        && (appState.stateSelectedTo.day > index)
        && isSameMonth;

      const inIntervalOtherMonth = (((appState.stateSelectedFrom.day < index) && isFrom)
        || ((appState.stateSelectedTo.day > index) && !isFrom))
        && !isSameMonth;

      if ((inIntervalSameMonth || inIntervalOtherMonth) && isDaysSelected) {
        item.classList.add('day--interval');
      } else {
        item.classList.remove('day--interval');
      }
    });
  });
}

export default daysComponent;