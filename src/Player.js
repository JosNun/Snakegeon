import Entity from "./Entity";
import { keys, lastKeys } from "./keys";

class Player extends Entity {
  constructor(x, y, world) {
    super(x, y, world.level, { color: "#00ff00" });

    this.world = world;
    this.canMove = -1;
    this.canTp = false;
  }

  getEntityAt(x, y) {
    const entity = this.world.level[y][x];

    return entity;
  }

  move(x, y) {
    this.canMove--;

    //prevent player from speeding
    if (this.canMove >= 0) {
      return;
    }

    const level = this.world.level;

    let newX = this.x + x;
    let newY = this.y + y;

    // keep within world bounds
    if (newX < 0 || newX > level[0].length - 1) {
      newX = this.x;
    }

    if (newY < 0 || newY > level.length - 1) {
      newY = this.y;
    }

    //prevent from walking into stuff
    const targetEntity = this.getEntityAt(newX, newY);
    if (targetEntity.isSolid()) {
      newX = this.x;
      newY = this.y;
    }

    if (targetEntity.isPortal()) {
      console.log("You dun progressed a tiny bit! Beat this nest level! Ha!");
      this.world.loadNextLevel();
    }

    //change position
    this.x = newX;
    this.y = newY;
    this.canMove = 10;
    this.world.update();
    this.canTp = true;
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

    if (keys[" "] && this.canTp) {
      this.world.loadNextLevel();
    }
  }

  tick() {
    this.control();
  }
}

export default Player;
