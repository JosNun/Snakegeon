const canvas = document.getElementById('game');

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

const ctx = canvas.getContext('2d');

let x = 0;
let y = 0;

function update() {
  ctx.clearRect(0, 0, width, height);
  ctx.fillRect(x, y, 80, 75);

  x += Math.random() * 10 + 1;
  y++;

  window.requestAnimationFrame(update);
}

update();
