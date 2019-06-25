import Engine from './engine';
import Game from './game';

const engine = new Engine();
const game = new Game(engine);
game.start();

export default { game, engine };
