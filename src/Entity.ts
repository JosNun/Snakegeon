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

  getTileAt(
    x: number,
    y: number,
    includePlayer = true
  ): World["tiles"][0] | undefined {
    const entity = this.world?.tiles.find((tile) => {
      if (!includePlayer && tile instanceof Player) {
        return false;
      }
      return tile.x === x && tile.y === y;
    });

    return entity;
  }
}

export default Entity;
