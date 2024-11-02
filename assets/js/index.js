document.addEventListener('DOMContentLoaded', () => {
  const game = new Game('game-canvas', 'collision-container');
  game.start();

  window.addEventListener('keydown', (event) => game.onKeyDown(event));
  window.addEventListener('keyup', (event) => game.onKeyUp(event));
});