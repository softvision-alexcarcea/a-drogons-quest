import Dispatcher from './dispatcher';

export default class Actor extends Dispatcher {
  constructor() {
    super();
    this._state = [];
  }
  init(state) {
    state.forEach(({ x, y }) => this.visit(x, y));
  }
  visit(x, y) {
    this._state.unshift({ x, y });
    this.dispatch('visit', x, y);
  }
  leave() {
    const { x, y } = this._state.pop();
    this.dispatch('leave', x, y);
  }
  current() {
    return this._state[0];
  }
}