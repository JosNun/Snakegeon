import Tile from "./Tile";
import Player from "./Player";

class World {
  constructor(canvas) {
    this.size =
      window.innerWidth < window.innerHeight
        ? window.innerWidth
        : window.innerHeight;

    this.ctx = canvas.getContext("2d");

    this.level = this.loadLevel(canvas);
  }

  loadLevel(canvas) {
    const levelData = [
      "w . . . . . . . . . . . . . . .",
      ". . . . . . . . . . . . . . . .",
      ". . p . . . . . . . . . . . . .",
      ". . . . . . . . . . . . . . . .",
      ". . . . . . . . . . . . . . . .",
      ". . . . . . . . . . . . . . . .",
      ". . . . . . . . w w w w w w w .",
      ". . . . . . . . w . . . . . w .",
      ". . . w w w w w w . . O . . w .",
      ". . . . . . . . . . . . . . w .",
      ". . . . . . . . . . . . . . w .",
      ". . . . . . . . w w w w w w w .",
      ". . . . . . . . . . . . . . . .",
      ". . . . . . . . . . . . . . . .",
      ". . . . . . . . . . . . . . . .",
      ". . . . . . . . . . . . . . . ."
    ].map(row => row.replace(/\s/g, ""));

    const tileSize = Math.floor(this.size / levelData.length);
    canvas.width = tileSize * levelData.length;
    canvas.height = tileSize * levelData[0].length;

    const playerPos = {
      x: 0,
      y: 0
    };

    const level = levelData.map((row, y) => {
      const parsedRow = row.replace(/\s/g, "");
      const rowData = parsedRow.split("");
      const rowEntities = rowData.map((tileType, x) => {
        switch (tileType.toLowerCase()) {
          case "w":
            return new Tile(x, y, {
              color: "#000",
              isSolid: true
            });
          case "p":
            playerPos.x = x;
            playerPos.y = y;
            return new Tile(x, y, { color: "#fa0" });
          default:
            return new Tile(x, y, { color: "#fa0" });
        }
      });

      return rowEntities;
    });

    this.player = new Player(playerPos.x, playerPos.y, level, this.update);

    return level;
  }

  tick() {
    this.player.tick();
    this.render();
  }

  render() {
    this.ctx.clearRect(0, 0, this.size, this.size);
    const tileSize = Math.floor(this.size / this.level.length);

    this.level.forEach(column => {
      column.forEach(row => {
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
