import Tile from "./Tile";

class Entity extends Tile {
  constructor(size, x, y, level, { color } = {}) {
    super(size, x, y, { color: color, isSolid: true });
    this.level = level;
  }
}

export default Entity;
