import inputComponent from './inputComponent.js';

function yearChangeComponent(rootElement, appState, state) {
  const yearChangeWrapper = rootElement.querySelector('.year-change__wrapper');
  const selectInputYear = rootElement.querySelector('.select__input');
  const selectContainerYear = rootElement.querySelector('.select__container');
  const selectContainerWrapYear = rootElement.querySelector('.select__container-wrap--year');
  const yearChangeButtonPrev = rootElement.querySelector('.year-change__button--prev');
  const yearChangeButtonNext = rootElement.querySelector('.year-change__button--next');
  const yearChangeButtonOpenList = rootElement.querySelector('.year-change__button--open-list');

  const baseYear = new Date().getFullYear();
  const yearTags = new Array(baseYear - 1995).fill(0).map((it, i) => baseYear - i);
  selectContainerWrapYear.textContent = '';
  yearTags.forEach(it => {
    selectContainerWrapYear.innerHTML += `<div class="select__item select__item--year">${it}</div>`;
  })

  yearChangeButtonPrev.onclick = () => {
    if (state.year > 0) {
      state.year--;
    }
  }

  yearChangeButtonNext.onclick = () => {
    if (state.year < baseYear) {
      state.year++;
    }
  }

  [...selectContainerWrapYear.children].forEach((item, index) => {
    item.onclick = () => {
      state.year = baseYear - index;
      appState.activePopup = '';
    }
  });

  const updateYears = (startYear) => {
    yearTags.forEach((item, index) => {
      if (item.toString().slice(0, startYear.length) != startYear) {
        selectContainerWrapYear.children[index].classList.add('hide-element');
      } else {
        selectContainerWrapYear.children[index].classList.remove('hide-element');
      }
    });
  }

  inputComponent(selectInputYear, {
    onCheckCorrect: (valueText) => {
      const value = valueText === '' ? -1 : Number(valueText);
      const isValid = !Number.isNaN(value)
        && (valueText[0] == 1 || valueText[0] == 2 || valueText[0] == undefined)
        && valueText.length <= 4;
      console.log(isValid);
      if (isValid) {
        updateYears(valueText);
      }
      return isValid;
    },
    onCheckComplete: (valueText) => { },
    onBlur: (valueText) => {
      const value = valueText === '' ? -1 : (Number(valueText));
      state.year = Number.isNaN(value) ? state.year : value;
      yearChangeButtonPrev.classList.remove('hidden-element');
      yearChangeButtonNext.classList.remove('hidden-element');
    },
    onFocus: (valueText) => {
      yearChangeButtonPrev.classList.add('hidden-element');
      yearChangeButtonNext.classList.add('hidden-element');
      appState.activeCalendar = state.calendarName;
      appState.activePopup = 'years';
    }
  });

  yearChangeButtonOpenList.onclick = () => {
    if (appState.activePopup == 'years' && appState.activeCalendar == state.calendarName) {
      appState.activePopup = '';
    } else {
      appState.activeCalendar = state.calendarName;
      appState.activePopup = 'years';
    }
  }

  appState.onChange.add(() => {
    if (appState.activePopup == 'years' && appState.activeCalendar == state.calendarName) {
      selectContainerYear.classList.add('select__container--open');
      yearChangeWrapper.classList.add('year-change__wrapper--select');
      rootElement.classList.add('mobile-active-popup');
    } else {
      selectContainerYear.classList.remove('select__container--open');
      yearChangeWrapper.classList.remove('year-change__wrapper--select');
      rootElement.classList.remove('mobile-active-popup');
    }
  })

  state.onChange.add(() => {
    if (state.isOpened) {
      rootElement.classList.remove('hide-element');
    } else {
      rootElement.classList.add('hide-element');
    }

    if (state.month == -1 || !state.isOpened) {
      rootElement.classList.add('date-change--border-bottom');
    } else {
      rootElement.classList.remove('date-change--border-bottom');
    } 

    selectInputYear.value = (state.year != -1) ? state.year : '';
    const currentYear = new Date().getFullYear();
    if (state.year == currentYear) {
      yearChangeButtonNext.disabled = true;
    } else {
      yearChangeButtonNext.disabled = false;
    }
  });
}

export default yearChangeComponent;