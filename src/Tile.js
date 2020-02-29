class Tile {
  constructor(size, x, y, { color, isSolid } = {}) {
    this.size = size;
    this.x = x;
    this.y = y;
    this.color = color || "#fa0";
    this.isSolid = isSolid || false;
  }

  render(ctx) {
    const { x, y } = this;
    const size = this.size;

    ctx.fillStyle = this.color;
    ctx.fillRect(x * size, y * size, size, size);
  }

  update(ctx) {
    this.render(ctx);
  }
}

export default Tile;
