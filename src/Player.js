import Entity from "./Entity";
import { keys } from "./keys";

class Player extends Entity {
  constructor(size, x, y, level, onUpdate) {
    super(size, x, y, level, { color: "#00ff00" });

    this.updateWorld = onUpdate;
    this.canMove = -1;
  }

  move(x, y) {
    let newX = this.x + x;
    let newY = this.y + y;

    if (newX < 0 || newX > this.level[0].length - 1) {
      newX = this.x;
    }

    if (newY < 0 || newY > this.level.length - 1) {
      newY = this.y;
    }

    if (this.canMove < 0 && (newX !== this.x || newY !== this.y)) {
      this.x = newX;
      this.y = newY;
      this.canMove = 10;
      this.updateWorld();
    } else {
      this.canMove--;
    }
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
