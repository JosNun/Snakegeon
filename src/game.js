import World from './World';

const canvas = document.getElementById('game');

const w = new World(canvas);

function update() {
  w.update();
  window.requestAnimationFrame(update);
}

update();