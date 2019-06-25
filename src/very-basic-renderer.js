export default class Renderer {
  constructor(container, board) {
    this._container = container;
    container.className = 'z i';
    container.innerHTML = '';
    this._width = board._width;
    let cells = this._cells = [];
    
    const length = board._width * board._height;
    for (let i = 0; i < length; i++) {
      const cell = document.createElement('div');
      cell.className = 'c e';
      container.appendChild(cell);
      cells.push(cell);
    }
    
    board.on('u', (x, y, state) => {
      if (state == 1) {
        this.actor(x, y);
      } else if (state == 2) {
        this.goal(x, y);
      } else {
        this.empty(x, y);
      }
    });
  }
  set(x, y, state) {
    const cell = this._cells[x * this._width + y];
    cell.className = state;
  }
  empty(x, y) {
    this.set(x, y, 'c e');
  }
  actor(x, y) {
    this.set(x, y, 'c a');
  }
  goal(x, y) {
    this.set(x, y, `c g`);
  }
  start() {
    this._container.className = 'z s';
  }
  pause() {
    this._container.className = 'z p';
  }
  end() {
    this._container.className = 'z o';
  }
  score(value) {
    this._container.dataset['s'] = value;
  }
}
