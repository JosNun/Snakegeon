import Tile from "./Tile";

class Entity extends Tile {
  constructor(x, y, level, { color } = {}) {
    super(x, y, { color: color, isSolid: true });
    this.level = level;
  }
}

export default Entity;
