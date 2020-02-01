import WorldData from './worldData';

class Tile {
  constructor(x, y, { color } = {}) {
    this.x = x;
    this.y = y;
    this.color = color || '#fa0';
  }

  render(ctx) {
    const { x, y } = this;
    const size = WorldData.blockSize;

    ctx.fillStyle = this.color;
    ctx.fillRect(x * size, y * size, size, size);
  }

  update(ctx) {
    this.render(ctx);
  }
}

export default Tile;
