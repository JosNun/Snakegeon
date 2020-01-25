const canvas = document.getElementById('game');

const size =
  window.innerWidth < window.innerHeight
    ? window.innerWidth
    : window.innerHeight;

canvas.width = size;
canvas.height = size;

const ctx = canvas.getContext('2d');

let x = 0;
let y = 0;

function update() {
  ctx.clearRect(0, 0, size, size);
  ctx.fillRect(x, y, 80, 75);

  x += Math.random() * 10 + 1;
  y++;

  window.requestAnimationFrame(update);
}

update();
