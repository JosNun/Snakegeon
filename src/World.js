import Tile from "./Tile";
import Player from "./Player";
import levels from "./data/levels.json";
import { reset as resetKeys } from "./keys";

class World {
  constructor(canvas) {
    this.canvas = canvas;
    this.size =
      window.innerWidth < window.innerHeight
        ? window.innerWidth
        : window.innerHeight;

    this.ctx = canvas.getContext("2d");

    this.currentLevel = 0;
    this.level = this.loadLevel(levels[this.currentLevel]);
  }

  setLevel(count) {
    resetKeys();
    this.currentLevel = this.currentLevel + (count ?? 1);

    if (this.currentLevel > levels.length - 1 || this.currentLevel.length < 0) {
      this.currentLevel = 0;
    }

    this.level = this.loadLevel(levels[this.currentLevel]);
  }

  loadLevel(lev) {
    const levelData = lev.map((row) => row.replace(/\s/g, ""));

    const tileSize = Math.floor(this.size / levelData.length);
    this.canvas.width = tileSize * levelData.length;
    this.canvas.height = tileSize * levelData[0].length;

    let entities = [];

    const level = levelData.map((row, y) => {
      const parsedRow = row.replace(/\s/g, "");
      const rowData = parsedRow.split("");
      const rowEntities = rowData.map((tileType, x) => {
        switch (tileType.toLowerCase()) {
          case "w":
            return new Tile(x, y, {
              color: "#000",
              isSolid: true,
            });
          case "m":
            return new Tile(x, y, {
              color: "#ff3310",
              isDeadly: true,
            });
          case "o":
            return new Tile(x, y, {
              color: "#a000c0",
              isPortal: true,
            });
          case "p":
            this.player = new Player(x, y, this);
            entities.push(this.player);
            return new Tile(x, y, { color: "#fa0" });
          default:
            return new Tile(x, y, { color: "#fa0" });
        }
      });

      return rowEntities;
    });

    for (let i in entities) {
      entities[i].setLevel(level);
    }

    return level;
  }

  tick() {
    this.player.tick();
    this.render();
  }

  render() {
    this.ctx.clearRect(0, 0, this.size, this.size);
    const tileSize = Math.floor(this.size / this.level.length);

    this.level.forEach((column) => {
      column.forEach((row) => {
        row.render(this.ctx, tileSize);
      });
    });

    this.player.render(this.ctx, tileSize);
  }

  update() {
    // do something...
    console.log("updated :D");
  }
}

export default World;
