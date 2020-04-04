import Entity from "./Entity";

class Patroller extends Entity {
  constructor(x, y, meta = {}) {
    super(x, y, meta);
    this.direction = meta.direction;
    this.heading = meta.heading ?? 1;
  }

  isDeadly() {
    return true;
  }

  update() {
    let newX = this.x;
    let newY = this.y;

    if (this.direction === "x") {
      newX += this.heading;
    } else {
      newY += this.heading;
    }

    const targetTile = this.getTileAt(newX, newY);
    if (!targetTile || targetTile.isSolid()) {
      newX = this.x;
      newY = this.y;

      this.heading = this.heading * -1;
    }

    this.x = newX;
    this.y = newY;
  }
}

export default Patroller;
