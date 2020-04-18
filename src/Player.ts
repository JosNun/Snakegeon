import Entity from "./Entity";
import { keys } from "./keys";
import World from "./World";

class Player extends Entity {
  canMove: boolean;
  canTp: boolean;

  constructor(x: number, y: number) {
    super(x, y, { color: "#00ff00" });
    this.canMove = true;
    this.canTp = false;
  }

  move(x: number, y: number) {
    if (!this.world) {
      return;
    }

    this.canMove = false;

    const levelSize = this.world.currentLevelData.size;

    let newX = this.x + x;
    let newY = this.y + y;

    // keep within world bounds
    if (newX < 0 || newX > levelSize - 1) {
      newX = this.x;
    }

    if (newY < 0 || newY > levelSize - 1) {
      newY = this.y;
    }

    //prevent from walking into stuff
    const targetTile = this.getTileAt(newX, newY);
    if (targetTile?.isSolid()) {
      newX = this.x;
      newY = this.y;
    }

    if (targetTile?.isDeadly()) {
      this.world.setLevel(0);
      return;
    }

    if (targetTile?.isPortal()) {
      console.log("You dun progressed a tiny bit! Beat this nest level! Ha!");
      this.world.setLevel();
    }

    const targetEntity = this.getTileAt(newX, newY, false);

    if (targetEntity && targetEntity.isDeadly()) {
      this.world.setLevel(0);
      return;
    }

    //change position
    if (this.x !== newX || this.y !== newY) {
      this.x = newX;
      this.y = newY;

      this.canTp = true;

      this.world.update().then(() => {
        //you updated yet? If yes keep going. If no, wait.

        const targetEntity2 = this.getTileAt(this.x, this.y, false);

        if (targetEntity2 && targetEntity2.isDeadly()) {
          (this.world as World).setLevel(0);
          return;
        }
        this.canMove = true;
      });
    } else {
      this.canMove = true;
    }
  }

  control() {
    if (!this.canMove) {
      return;
    }

    if (keys["w"]) {
      this.move(0, -1);
    } else if (keys["s"]) {
      this.move(0, 1);
    } else if (keys["a"]) {
      this.move(-1, 0);
    } else if (keys["d"]) {
      this.move(1, 0);
    }

    if (keys[" "] && this.canTp) {
      this.world?.setLevel();
    }
  }

  tick() {
    this.control();
  }
}

export default Player;
