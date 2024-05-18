import { monthsNames, checkParent } from './utils.js';

function monthChangeComponent(rootElement, appState, state) {
  const selectInputMonth = rootElement.querySelector('.select__input');
  const selectContainerMonth = rootElement.querySelector('.select__container');
  const selectContainerWrap = rootElement.querySelector('.select__container-wrap');
  const monthChangeButtonPrev = rootElement.querySelector('.month-change__button--prev');
  const monthChangeButtonNext = rootElement.querySelector('.month-change__button--next');
  const monthChangeButtonOpenList = rootElement.querySelector('.month-change__button--open-list');

  monthChangeButtonPrev.onclick = (evt) => {
    evt.stopPropagation();
    if (state.month > 0) {
      state.month--;
    }
  }

  monthChangeButtonNext.onclick = (evt) => {
    evt.stopPropagation();
    if (state.month < 11) {
      state.month++;
    }
  }

  const close = (evt) => {
    if(!checkParent(evt.target, rootElement)) {
      appState.activePopup = '';      
    }    
  }

  [...selectContainerWrap.children].forEach((item, index) => {
    item.onclick = (evt) => {
      evt.stopPropagation();
      state.month = index;
      appState.activePopup = '';
    }
  });

  rootElement.onclick = () => {
    if (appState.activePopup == 'months' && appState.activeCalendar == state.calendarName) {
      appState.activePopup = '';
    } else {
      appState.activeCalendar = state.calendarName;
      appState.activePopup = 'months';
    }
  }

  selectInputMonth.onblur = () => { },

    // selectInputMonth.onfocus = () => {
    //   appState.activeCalendar = state.calendarName;
    //   appState.activePopup = 'months';
    // }

  appState.onChange.add(() => {
    if (appState.activePopup == 'months' && appState.activeCalendar == state.calendarName) {
      selectContainerMonth.classList.add('select__container--open');
      rootElement.classList.add('mobile-active-popup');
      window.addEventListener('click', close, true);
    } else {
      selectContainerMonth.classList.remove('select__container--open');
      rootElement.classList.remove('mobile-active-popup');
      window.removeEventListener('click', close, true);
    }
  })

  state.onChange.add(() => {
    if (state.isOpened) {
      rootElement.classList.remove('hide-element');
    } else {
      rootElement.classList.add('hide-element');
    }

    if(state.month == -1) {
      monthChangeButtonPrev.classList.add('hidden-element');
      monthChangeButtonNext.classList.add('hidden-element');
    } else {
      monthChangeButtonPrev.classList.remove('hidden-element');
      monthChangeButtonNext.classList.remove('hidden-element');
    }


    selectInputMonth.textContent = (state.month != -1) ? monthsNames[state.month] : 'Выберите месяц';
    if (state.month == 0) {
      monthChangeButtonPrev.disabled = true;
    } else {
      monthChangeButtonPrev.disabled = false;
    }
    if (state.month == 11) {
      monthChangeButtonNext.disabled = true;
    } else {
      monthChangeButtonNext.disabled = false;
    }
  });
}

export default monthChangeComponent;