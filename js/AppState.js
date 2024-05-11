import Signal from "./signal.js";
import DateState from "./dateState.js";

class AppState {
  constructor() {
    this.onChange = new Signal();
    this.stateSelectedFrom = new DateState('from');
    this.stateSelectedTo = new DateState('to');
    this.stateSelectedFrom.onChange.add(() => {
      this.onChange.emit();
    })
    this.stateSelectedTo.onChange.add(() => {
      this.onChange.emit();
    })
    this._activeCalendar = '';
    this._activePopup = '';
  }

  get activeCalendar() {
    return this._activeCalendar;
  }

  set activeCalendar(value) {
    this._activeCalendar = value;
    this.onChange.emit();
  }

  get activePopup() {
    return this._activePopup;
  }

  set activePopup(value) {
    this._activePopup = value;
    this.onChange.emit();
  }

  get activeState() {
    if (this.activeCalendar == 'from') {
      return this.stateSelectedFrom
    } else if (this.activeCalendar == 'to') {
      return this.stateSelectedTo;
    }
  }
}

export default AppState;