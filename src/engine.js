import Dispatcher from './dispatcher';

// we're shooting for flawless rendering performance
// the average human eye can only detect around 60 frames every second
// 60FPS means 6 frames every 100ms, so 1 frame every ~16.(6)ms,
// but we're rounding down to the nearest multiple of 5,
// because that makes things nicer to look at
const MS_PER_TICK = 15;
const
  STATE_STOPPED = 0,
  STATE_PAUSED = 1,
  STATE_RUNNING = 2
;

export default class Engine extends Dispatcher {
  constructor() {
    super();
    this._state = STATE_STOPPED;
  }
  start() {
    if (this._state === STATE_RUNNING) {
      return;
    }
    if (!this._timer) {
      this._timer = setInterval(() => this.tick(), MS_PER_TICK);
    }
    this._state = STATE_RUNNING;
    this.dispatch('start');
  }
  pause() {
    if (this._state === STATE_PAUSED) {
      return;
    }
    this._state = STATE_PAUSED;
    this.dispatch('pause');
  }
  tick() {
    if (this._state === STATE_RUNNING) {
      try {
        this.dispatch('update');
      } catch (e) {
        console.error('Error encountered, forcefully stopping engine...', e);
        this.stop();
      }
    }
  }
  stop() {
    if (this._state === STATE_STOPPED) {
      return;
    }
    if (this._timer) {
      clearInterval(this._timer);
      delete this._timer;
    }
    this._state = STATE_STOPPED;
    this.dispatch('stop');
  }
  isPlaying() {
    return (this._state === STATE_RUNNING);
  }
}
