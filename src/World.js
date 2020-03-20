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

    this.ctx = canvas.getContext("2d");

    this.level = this.loadLevel();
  }

  loadLevel() {
    const levelData = [
      "w . . . . . . . . . . . . . . .",
      ". . . . . . . . . . . . . . . .",
      ". . p . . . . . . . . . . . . .",
      ". . . . . . . . . . . . . . . .",
      ". . . . . . . . . . . . . . . .",
      ". . . . . . . . w w w w w w w .",
      ". . . . . . . . w . . . . . w .",
      ". . . w w w w w w . . . . . w .",
      ". . . . . . . . . . . . . . w .",
      ". . . . . . . . . . . . . . w .",
      ". . . . . . . . w w w w w w w .",
      ". . . . . . . . . . . . . . . .",
      ". . . . . . . . . . . . . . . .",
      ". . . . . . . . . . . . . . . .",
      ". . . . . . . . . . . . . . . .",
      ". . . . . . . . . . . . . . . ."
    ];

    const playerPos = {
      x: 0,
      y: 0
    };

    const tileSize = Math.floor(this.size / levelData.length);

    const level = levelData.map((row, y) => {
      const parsedRow = row.replace(/\s/g, "");
      const rowData = parsedRow.split("");
      const rowEntities = rowData.map((tileType, x) => {
        switch (tileType) {
          case "w":
            return new Tile(tileSize, x, y, {
              color: "#000",
              isSolid: true
            });
          case "p":
            playerPos.x = x;
            playerPos.y = y;
            return new Tile(tileSize, x, y, { color: "#fa0" });
          default:
            return new Tile(tileSize, x, y, { color: "#fa0" });
        }
      });

      return rowEntities;
    });

    this.player = new Player(
      tileSize,
      playerPos.x,
      playerPos.y,
      level,
      this.update
    );

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
