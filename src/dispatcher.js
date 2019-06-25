export default class Dispatcher {
  dispatch(event, ...args) {
    const handler = `on${event}`;
    this[handler] && this[handler](...args);
  }
  on(event, handler) {
    this[`on${event}`] = handler;
  }
}