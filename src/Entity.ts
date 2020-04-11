import Tile from "./Tile";
import Player from "./Player";
import { TileMeta } from "./types";
import World from "./World";

class Entity extends Tile {
  world?: World;
  update?: () => void;

  constructor(x: number, y: number, { color }: Partial<TileMeta> = {}) {
    super(x, y, { color: color, isSolid: true });

    this.world = undefined;
  }

  setWorld(world: World) {
    this.world = world;
  }

  getTileAt(x: number, y: number) {
    const tile = this.world?.level[y]?.[x];

    return tile;
  }

  getEntityAt(x: number, y: number, includePlayer = true) {
    const entity = this.world?.entities?.find((entity) => {
      if (!includePlayer && entity instanceof Player) {
        return false;
      }

      return entity.x === x && entity.y === y;
    });

    return entity;
  }
}

export default Entity;
