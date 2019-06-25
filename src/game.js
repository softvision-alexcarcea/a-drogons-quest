import Actor from './actor';
import Board from './board';
import Dispatcher from './dispatcher';
import Renderer from './very-basic-renderer';

const
  width = 10,
  height = 10,
  score_delta = 1,
  speed_init = 10
;

const
  DIR_LEFT = 0,
  DIR_RIGHT = 1,
  DIR_UP = 2,
  DIR_DOWN = 3
;

export default class Game extends Dispatcher {
  constructor(engine) {
    super();
    
    this._engine = engine;
    engine.on('u', () => this.update());
    engine.on('s', () => this._renderer.start());
    engine.on('p', () => this._renderer.pause());
    engine.on('o', () => this._renderer.end());
    
    document.documentElement.addEventListener('keydown', (event) => this.handle(event));
  }
  score(value) {
    this._score = value;
    this._renderer.score(value)
  }
  start() {
    const actor = this._actor = new Actor();
    const board = this._board = new Board(width, height, actor);
    const renderer = this._renderer = new Renderer(document.getElementById('g'), board);
    
    this._dir = DIR_LEFT;
    this._steer = null;
    this._speed = speed_init;
    this._counter = 0;
    this.score(0);
    
    const row = Math.floor(width / 2);
    const col = Math.floor(height / 2);
    const visited = [
      { x: row, y: col + 1 },
      { x: row, y: col },
      { x: row, y: col - 1 }
    ];
    actor.init(visited);
    board.spawn();
    renderer.start();

    this._started = true;
  }
  next() {
    let { x, y } = this._actor.current();
    switch (this._dir) {
      case DIR_UP:
        x -= 1;
        break;
      case DIR_DOWN:
        x += 1;
        break;
      case DIR_RIGHT:
        y += 1;
        break;
      case DIR_LEFT:
      default:
        y -= 1;
        break;
    }
    return { x, y };
  }
  update() {
    if (this._counter < this._speed) {
      this._counter++;
      return;
    }
    if (typeof this._steer === 'number') {
      this._dir = this._steer;
      this._steer = null;
    }
    this._counter = 0;
    const board = this._board;
    const actor = this._actor;
    const engine = this._engine;
    const { x, y } = this.next();
    if (board.isOutside(x, y) || board.isActor(x, y)) {
      this._started = false;
      engine.stop();
    } else if (board.isGoal(x, y)) {
      this.score(this._score + score_delta);
      actor.visit(x, y);
      board.spawn();
    } else {
      actor.visit(x, y);
      actor.leave();
    }
  }
  toggle() {
    const engine = this._engine;
    if (engine.isPlaying()) {
      engine.pause();
    } else {
      if (this._started) {
        engine.start();
      } else {
        this.start();
      }
    }
  }
  handle(event) {
    const key = event.key;
    if (key == 'w') {
      if (this._dir !== DIR_DOWN) {
        this._steer = DIR_UP;
      }
    } else if (key == 'a') {
      if (this._dir !== DIR_RIGHT) {
        this._steer = DIR_LEFT;
      }
    } else if (key == 's') {
      if (this._dir !== DIR_UP) {
        this._steer = DIR_DOWN;
      }
    } else if (key == 'd') {
      if (this._dir !== DIR_LEFT) {
        this._steer = DIR_RIGHT;
      }
    } else if (key == ' ') {
        this.toggle();
    }
  }
}
