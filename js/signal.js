class Signal {
  listeners;

  constructor() {
    this.listeners = [];
  }

  add(listener) {
    this.listeners.push(listener);
  }

  remove(listener) {
    this.listeners = this.listeners.filter((elem) => elem !== listener);
  }

  emit(params) {
    this.listeners.forEach((listener) => listener(params));
  }
}

export default Signal;