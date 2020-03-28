class Tile {
  constructor(x, y, { color, isSolid } = {}) {
    this.x = x;
    this.y = y;
    this.color = color || "#fa0";
    this.isSolid = isSolid || false;
  }

  render(ctx, size) {
    const { x, y } = this;

    ctx.fillStyle = this.color;
    ctx.fillRect(x * size, y * size, size, size);
  }

  update(ctx) {
    this.render(ctx);
  }
}

export default Tile;
