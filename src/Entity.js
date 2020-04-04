import Tile from "./Tile";

class Entity extends Tile {
  constructor(x, y, { color } = {}) {
    super(x, y, { color: color, isSolid: true });
    this.level = undefined;
  }

  setLevel(level) {
    this.level = level;
  }
}

export default Entity;
