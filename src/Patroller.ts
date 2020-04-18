import Entity from "./Entity";
import { PatrollerMeta } from "./types";
import Player from "./Player";

const defaultMeta = {
  direction: "x",
  heading: 1,
};

class Patroller extends Entity {
  direction: string;
  heading: number;

  constructor(x: number, y: number, meta: Partial<PatrollerMeta>) {
    super(x, y, meta);

    const mergedMeta = {
      ...defaultMeta,
      ...meta,
    };

    this.direction = mergedMeta.direction;
    this.heading = mergedMeta.heading;
  }

  isDeadly() {
    return true;
  }

  update = () => {
    if (!this.world) {
      return;
    }

    let newX = this.x;
    let newY = this.y;

    if (this.direction === "x") {
      newX += this.heading;
    } else {
      newY += this.heading;
    }

    const levelSize = this.world?.currentLevelData.size;

    // keep within world bounds
    if (newX < 0 || newX > levelSize - 1) {
      newX = this.x;
    }

    if (newY < 0 || newY > levelSize - 1) {
      newY = this.y;
    }

    const targetTile = this.getTileAt(newX, newY);

    if (targetTile?.isSolid()) {
      if (!(targetTile instanceof Player)) {
        this.heading = this.heading * -1;

        if (this.direction === "x") {
          newX = this.x + this.heading;
        } else {
          newY = this.y + this.heading;
        }
      }
    }

    this.x = newX;
    this.y = newY;
  };
}

export default Patroller;
