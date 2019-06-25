import Dispatcher from './dispatcher';
import { random } from './utils';

const
  STATE_EMPTY = 0,
  STATE_ACTOR = 1,
  STATE_GOAL = 2
;

export default class Board extends Dispatcher {
  constructor(width, height, actor) {
    super();
    this._width = width;
    this._height = height;
    this._state = new Array(width * height).fill(STATE_EMPTY);
    actor.on('visit', (x, y) => this.visit(x, y));
    actor.on('leave', (x, y) => this.leave(x, y));
  }
  set(x, y, state) {
    this._state[x * this._width + y] = state;
    this.dispatch('update', x, y, state);
  }
  get(x, y) {
    return this._state[x * this._width + y];
  }
  spawn() {
    const length = this._state.length;
    let position;
    do {
      position = random(length);
    } while (this._state[position]);
    this._state[position] = STATE_GOAL;
    
    const x = Math.floor(position / this._width);
    const y = position % this._width;
    this.dispatch('update', x, y, STATE_GOAL);
  }
  visit(x, y) {
    this.set(x, y, STATE_ACTOR);
  }
  leave(x, y) {
    this.set(x, y, STATE_EMPTY);
  }
  isEmpty(x, y) {
    return this.get(x, y) === STATE_EMPTY;
  }
  isActor(x, y) {
    return this.get(x, y) === STATE_ACTOR;
  }
  isGoal(x, y) {
    return this.get(x, y) === STATE_GOAL;
  }
  isOutside(x, y) {
    return (x < 0 || x >= this._width || y < 0 || y >= this._height);
  }
}
