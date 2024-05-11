function inputComponent(inputElement, { onCheckCorrect, onCheckComplete, onBlur, onFocus }) {
  const dateChangeInputDay = inputElement;
  let lastDayValue = dateChangeInputDay.value;
  let lastDayCursorPositionStart = dateChangeInputDay.selectionStart;
  let lastDayCursorPositionEnd = dateChangeInputDay.selectionStart;

  const updateLast = () => {
    lastDayCursorPositionStart = dateChangeInputDay.selectionStart;
    lastDayCursorPositionEnd = dateChangeInputDay.selectionEnd;
    lastDayValue = dateChangeInputDay.value;
  }

  const restoreLast = () => {
    dateChangeInputDay.value = lastDayValue;
    dateChangeInputDay.selectionStart = lastDayCursorPositionStart;
    dateChangeInputDay.selectionEnd = lastDayCursorPositionEnd;
  }

  dateChangeInputDay.onbeforeinput = (e) => {
    updateLast();
  }

  dateChangeInputDay.oninput = () => {
    const value = dateChangeInputDay.value === '' ? -1 : Number(dateChangeInputDay.value);
    const inputValue = dateChangeInputDay.value;
    if (onCheckCorrect(dateChangeInputDay.value)) {
      updateLast();
    } else {
      restoreLast();
    }
    if (dateChangeInputDay.selectionStart == inputValue.length) {
      onCheckComplete(dateChangeInputDay.value);
    }
  }

  dateChangeInputDay.onblur = () => {
    onBlur(dateChangeInputDay.value);
  }

  dateChangeInputDay.onfocus = () => {
    lastDayValue = dateChangeInputDay.value;
    onFocus(dateChangeInputDay.value);
  }
}

export default inputComponent;