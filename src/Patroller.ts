import Entity from "./Entity";
import { PatrollerMeta } from "./types";

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
    let newX = this.x;
    let newY = this.y;

    if (this.direction === "x") {
      newX += this.heading;
    } else {
      newY += this.heading;
    }

    const targetTile = this.getTileAt(newX, newY);
    const targetEntity = this.getEntityAt(newX, newY, false);
    if (!targetTile || targetTile.isSolid() || targetEntity) {
      this.heading = this.heading * -1;

      if (this.direction === "x") {
        newX = this.x + this.heading;
      } else {
        newY = this.y + this.heading;
      }
    }

    this.x = newX;
    this.y = newY;
  };
}

export default Patroller;
