class Tile {
  constructor(x, y, meta = {}) {
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

    ctx.fillStyle = this.meta.color ?? "#646464";
    ctx.fillRect(x * size, y * size, size, size);
  }
}

export default Tile;
