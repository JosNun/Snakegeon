import Tile from "./Tile";
import Player from "./Player";

class Entity extends Tile {
  constructor(x, y, { color } = {}) {
    super(x, y, { color: color, isSolid: true });

    this.world = undefined;
  }

  setWorld(world) {
    this.world = world;
  }

  getTileAt(x, y) {
    const tile = this.world.level[y]?.[x];

    return tile;
  }

  getEntityAt(x, y, includePlayer = true) {
    const entity = this.world.entities.find((entity) => {
      if (!includePlayer && entity instanceof Player) {
        return false;
      }

      return entity.x === x && entity.y === y;
    });

    return entity;
  }
}

export default Entity;
