import Entity from "./Entity";
import { keys } from "./keys";

class Player extends Entity {
  constructor(x, y) {
    super(x, y, { color: "#00ff00" });
    this.canMove = -1;
    this.canTp = false;
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
    const targetTile = this.getTileAt(newX, newY);
    if (targetTile.isSolid()) {
      newX = this.x;
      newY = this.y;
    }

    if (targetTile.isDeadly()) {
      this.world.setLevel(0);
      return;
    }

    if (targetTile.isPortal()) {
      console.log("You dun progressed a tiny bit! Beat this nest level! Ha!");
      this.world.setLevel();
    }

    const targetEntity = this.getEntityAt(newX, newY, false);

    if (targetEntity && targetEntity.isDeadly()) {
      this.world.setLevel(0);
      return;
    }

    //change position
    this.x = newX;
    this.y = newY;
    this.world.update();

    const targetEntity2 = this.getEntityAt(this.x, this.y, false);

    if (targetEntity2 && targetEntity2.isDeadly()) {
      this.world.setLevel(0);
      return;
    }

    this.canMove = 10;
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
      this.world.setLevel(true);
    }
  }

  tick() {
    this.control();
  }
}

export default Player;
