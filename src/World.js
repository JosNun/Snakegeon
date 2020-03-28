import Tile from "./Tile";
import Player from "./Player";
import TileFactory from "./TileFactory";

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

    TileFactory.setTileSize(tileSize);

    const level = levelData.map((row, y) => {
      const rowData = Array.from(row);
      const rowEntities = rowData.map((tileType, x) => {
        switch (tileType.toLowerCase()) {
          case "w":
            return TileFactory.createTile(Tile, x, y, {
              color: "#000",
              isSolid: true
            });
          case "p":
            playerPos.x = x;
            playerPos.y = y;
            return TileFactory.createTile(Tile, x, y, { color: "#fa0" });
          default:
            return TileFactory.createTile(Tile, x, y, { color: "#fa0" });
        }
      });

      return rowEntities;
    });

    this.player = TileFactory.createTile(
      Player,
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
