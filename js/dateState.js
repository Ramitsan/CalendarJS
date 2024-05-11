import Signal from "./signal.js";

class DateState {
  constructor(calendarName) {
    this.onChange = new Signal();
    this._day = -1;
    this._month = -1;
    this._year = -1;
    this._isOpened = false;
    this._isNunberMonth = false;
    this.calendarName = calendarName;
  }

  get day() {
    return this._day;
  }

  set day(value) {
    this._day = value;
    this.onChange.emit();
  }

  get month() {
    return this._month;
  }

  set month(value) {
    this._month = value;
    this.onChange.emit();
  }

  get year() {
    return this._year;
  }

  set year(value) {
    this._year = value;
    this.onChange.emit();
  }

  get isOpened() {
    return this._isOpened;
  }

  set isOpened(value) {
    this._isOpened = value;
    this.onChange.emit();
  }

  get isNunberMonth() {
    return this._isNunberMonth;
  }

  set isNunberMonth(value) {
    this._isNunberMonth = value;
    this.onChange.emit();
  }

  get asDate() {
    const date = new Date();
    date.setFullYear(this.year);
    date.setMonth(this.month);
    date.setDate(this.day + 1);
    return date;
  }
}

export default DateState;