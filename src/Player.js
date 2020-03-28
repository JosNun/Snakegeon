import Entity from "./Entity";
import { keys } from "./keys";

class Player extends Entity {
  constructor(x, y, level, onUpdate) {
    super(x, y, level, { color: "#00ff00" });

    this.level = level;
    this.updateWorld = onUpdate;
    this.canMove = -1;
  }

  getEntityAt(x, y) {
    const entity = this.level[y][x];

    return entity;
  }

  move(x, y) {
    this.canMove--;

    //prevent player from speeding
    if (this.canMove >= 0) {
      return;
    }

    let newX = this.x + x;
    let newY = this.y + y;

    // keep within world bounds
    if (newX < 0 || newX > this.level[0].length - 1) {
      newX = this.x;
    }

    if (newY < 0 || newY > this.level.length - 1) {
      newY = this.y;
    }

    //prevent from waling into stuffs

    const targetEntity = this.getEntityAt(newX, newY);
    if (targetEntity.isSolid) {
      newX = this.x;
      newY = this.y;
    }

    //change position
    this.x = newX;
    this.y = newY;
    this.canMove = 10;
    this.updateWorld();
  }

  control() {
    if (keys["w"]) {
      this.move(0, -1);
    } else if (keys["s"]) {
      this.move(0, 1);
    } else if (keys["a"]) {
      this.move(-1, 0);
    } else if (keys["d"]) {
      this.move(1, 0);
    } else {
      this.canMove = -1;
    }
  }

  tick() {
    this.control();
  }
}

export default Player;
