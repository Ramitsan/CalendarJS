import dateChangeComponent from "./dateChangeComponent.js";
import yearChangeComponent from "./yearChangeComponent.js";
import monthChangeComponent from "./monthChangeComponent.js";
import daysComponent from "./daysComponent.js";
import mobileHeader from "./mobileHeader.js";
import AppState from "./AppState.js";

const appState = new AppState();
const calendarOne = document.querySelector('.calendar--one');
const yearChangeOne = calendarOne.querySelector('.year-change');
const monthChangeOne = calendarOne.querySelector('.month-change');
const daysListOne = calendarOne.querySelector('.days');

dateChangeComponent(calendarOne, appState, appState.stateSelectedFrom);
yearChangeComponent(yearChangeOne, appState, appState.stateSelectedFrom);
monthChangeComponent(monthChangeOne, appState, appState.stateSelectedFrom);
daysComponent(daysListOne, appState, appState.stateSelectedFrom);

const calendarTwo = document.querySelector('.calendar--two');
const yearChangeTwo = calendarTwo.querySelector('.year-change');
const monthChangeTwo = calendarTwo.querySelector('.month-change');
const daysListTwo = calendarTwo.querySelector('.days');
const popupMobile = document.querySelector('.popup-mobile');

dateChangeComponent(calendarTwo, appState, appState.stateSelectedTo);
yearChangeComponent(yearChangeTwo, appState, appState.stateSelectedTo);
monthChangeComponent(monthChangeTwo, appState, appState.stateSelectedTo);
daysComponent(daysListTwo, appState, appState.stateSelectedTo);
mobileHeader(popupMobile, appState);

const buttonReset = document.querySelector('.button-reset');
const buttonApply = document.querySelector('.button-apply');

buttonReset.onclick = () => {
  appState.stateSelectedFrom.day = -1;
  appState.stateSelectedFrom.month = -1;
  appState.stateSelectedFrom.year = -1;
  appState.stateSelectedTo.day = -1;
  appState.stateSelectedTo.month = -1;
  appState.stateSelectedTo.year = -1;
  appState.stateSelectedFrom.isOpened = false;
  appState.stateSelectedTo.isOpened = false;
  appState.activeCalendar = '';
  appState.activePopup = '';
}

buttonApply.onclick = () => {
  appState.stateSelectedFrom.isNunberMonth = false;
  appState.stateSelectedTo.isNunberMonth = false;
  appState.stateSelectedFrom.isOpened = false;
  appState.stateSelectedTo.isOpened = false;
  appState.activeCalendar = '';
  appState.activePopup = '';
}

const currentDate = new Date();
appState.stateSelectedTo.day = currentDate.getDate() - 1;
appState.stateSelectedTo.month = currentDate.getMonth();
appState.stateSelectedTo.year = currentDate.getFullYear();

const app = document.querySelector('.app');

window.onresize = () => {
  const isMobile = matchMedia('(max-aspect-ratio: 1)').matches;
  if (isMobile) {
    app.style.width = '';
  } else {
    const aspect = 1 / 0.83;
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.height = '100vh';
    const height = document.documentElement.getBoundingClientRect().height;
    const width = document.documentElement.getBoundingClientRect().width;
    // const height = window.innerHeight;
    // const width = window.innerWidth;
    const calendarHeight = width / aspect;
    const scale = calendarHeight / height;
    const resultWidth = Math.min(width / scale, width);
    app.style.width = resultWidth + 'px';
    document.body.style['font-size'] = (19 / window.devicePixelRatio) + 'px';
    document.body.style['line-height'] = (22 / window.devicePixelRatio) + 'px';
    document.body.style.setProperty('--base-size', (1 / window.devicePixelRatio));
    document.documentElement.style.overflow = '';
    document.documentElement.style.height = '';
  }
}
window.onresize();
app.style.opacity = '1';

window.onload = () => {
  window.onresize();
}

const errorBlock = document.querySelector('.error-block');
const errorMessage = errorBlock.querySelector('.error-message');

appState.onChange.add(() => {
  if (appState.activeCalendar == 'from') {
    calendarTwo.classList.add('mobile-hidden');
  } else {
    calendarTwo.classList.remove('mobile-hidden');
  }

  if (appState.activeCalendar == 'to') {
    calendarOne.classList.add('mobile-hidden');
  } else {
    calendarOne.classList.remove('mobile-hidden');
  }

  if (appState.activeCalendar == '') {
    calendarOne.classList.add('auto-height');
    calendarTwo.classList.add('auto-height');
  } else {
    calendarOne.classList.remove('auto-height');
    calendarTwo.classList.remove('auto-height');
  }

  let isError = false;
  if (appState.stateSelectedFrom.isOpened == false
    && appState.stateSelectedTo.isOpened == false
    && appState.stateSelectedFrom.asDate.valueOf() > appState.stateSelectedTo.asDate.valueOf()) {
    isError = true;
    errorBlock.classList.remove('hide-element');
    errorMessage.textContent = 'Дата начала периода превышает дату окончания';
  }

  if (appState.stateSelectedFrom.isOpened == false
    && appState.stateSelectedTo.isOpened == false
    && appState.stateSelectedTo.asDate.valueOf() > Date.now()) {
    isError = true;
    errorBlock.classList.remove('hide-element');
    errorMessage.textContent = 'Выберите дату не позднее сегодняшнего дня';
  }
  if (!isError) {
    errorBlock.classList.add('hide-element');
  }

  const activeState = appState.activeState;
  if (activeState && activeState.year.toString().length == 4) {
    buttonApply.classList.add('button-apply--active');
  } else {
    buttonApply.classList.remove('button-apply--active');
  }
})

appState.stateSelectedFrom.onChange.emit();
appState.stateSelectedTo.onChange.emit();

