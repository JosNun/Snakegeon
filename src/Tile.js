class Tile {
  constructor(x, y, meta) {
    this.x = x;
    this.y = y;
    this.meta = meta;
  }

  isSolid() {
    return this.meta.isSolid ?? false;
  }

  isPortal() {
    return this.meta.isPortal ?? false;
  }

  isDeadly() {
    return this.meta.isDeadly ?? false;
  }

  render(ctx, size) {
    const { x, y } = this;

    ctx.fillStyle = this.meta.color;
    ctx.fillRect(x * size, y * size, size, size);
  }

  update(ctx) {
    this.render(ctx);
  }
}

export default Tile;
