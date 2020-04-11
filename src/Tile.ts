import { TileMeta } from "./types";

class Tile {
  x: number;
  y: number;
  meta: TileMeta;

  constructor(x: number, y: number, meta: Partial<TileMeta> = {}) {
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

  render(ctx: CanvasRenderingContext2D, size: number) {
    const { x, y } = this;

    ctx.fillStyle = this.meta.color ?? "#646464";
    ctx.fillRect(x * size, y * size, size, size);
  }
}

export default Tile;
