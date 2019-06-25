import { pick } from './utils';

const goals = [
  'cat', 'crow', 'dog', 'dove', 'fish', 'frog', 'hippo', 'horse', 'kiwi-bird', 'otter', 'spider'
];

export default class Renderer {
  constructor(container, board) {
    this._container = container;
    container.className = 'canvas init';
    container.innerHTML = '';
    this._width = board._width;
    this._height = board._height;
    this._cells = new Array(this._width * this._height)
      .fill(0).map(() => {
        const cell = document.createElement('div');
        cell.className = 'cell empty';
        container.appendChild(cell);
        return cell;
      })
    ;
    board.on('update', (x, y, state) => {
      switch (state) {
        case 1:
          this.actor(x, y);
          break;
        case 2:
          this.goal(x, y);
          break;
        case 0:
        default:
          this.empty(x, y);
          break;
      }
    });
  }
  set(x, y, state) {
    const cell = this._cells[x * this._width + y];
    cell.className = state;
  }
  empty(x, y) {
    this.set(x, y, 'cell empty');
  }
  actor(x, y) {
    this.set(x, y, 'cell actor');
  }
  goal(x, y) {
    const goal = pick(goals);
    this.set(x, y, `cell ${goal}`);
  }
  start() {
    this._container.className = 'canvas started';
  }
  pause() {
    this._container.className = 'canvas paused';
  }
  end() {
    this._container.className = 'canvas over';
  }
  score(value) {
    this._container.dataset['score'] = value;
  }
}