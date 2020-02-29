import WorldData from "./WorldData";
import Tile from "./Tile";
import Player from "./Player";

class World {
  constructor(canvas) {
    const size =
      window.innerWidth < window.innerHeight
        ? window.innerWidth
        : window.innerHeight;

    canvas.width = Math.round(size / 16) * 16;
    canvas.height = Math.round(size / 16) * 16;

    this.size = size;

    WorldData.setWorldSize(size);

    this.ctx = canvas.getContext("2d");

    this.level = this.loadLevel();

    this.player = new Player(3, 3, this.level, this.update);
  }

  loadLevel() {
    const level = [];

    for (let y = 0; y < 16; y++) {
      level.push([]);
      for (let x = 0; x < 16; x++) {
        level[y][x] = new Tile(x, y);
      }
    }

    return level;
  }

  tick() {
    this.player.tick();
    this.render();
  }

  render() {
    this.ctx.clearRect(0, 0, this.size, this.size);

    this.level.forEach(column => {
      column.forEach(row => {
        row.render(this.ctx);
      });
    });

    this.player.render(this.ctx);
  }

  update() {
    // do something...
    console.log("updated :D");
  }
}

export default World;
