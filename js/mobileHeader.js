function mobileHeader(rootElement, appState) {
  const popupMobileText = rootElement.querySelector('.popup-mobile__text');
  const buttonBack = rootElement.querySelector('.year-change__button--back');
  const buttonClose = rootElement.querySelector('.year-change__button--close');

  const popupLabels = {
    'years': 'Выберите год',
    'months': 'Выберите месяц',
    '': 'Выберите период'
  }

  buttonBack.onclick = () => {
    if (appState.activePopup) {
      appState.activePopup = '';
    } else {
      appState.activeCalendar = '';
      appState.stateSelectedFrom.isOpened = false;
      appState.stateSelectedTo.isOpened = false;
    }
  }

  buttonClose.onclick = () => {
    appState.activePopup = '';
    appState.activeCalendar = '';
    appState.stateSelectedFrom.isOpened = false;
    appState.stateSelectedTo.isOpened = false;
  }

  appState.onChange.add(() => {
    popupMobileText.textContent = popupLabels[appState.activePopup];
    if (appState.stateSelectedFrom.isOpened == false && appState.stateSelectedTo.isOpened == false) {
      rootElement.classList.add('mobile-hidden');
    } else {
      rootElement.classList.remove('mobile-hidden');
    }
  })
}

export default mobileHeader;