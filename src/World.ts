import Tile from "./Tile";
import Player from "./Player";
import levels from "./data/levels.json";
import Patroller from "./Patroller";
import { reset as resetKeys } from "./keys";
import Entity from "./Entity";

class World {
  canvas: HTMLCanvasElement;
  size: number;
  ctx: CanvasRenderingContext2D;
  currentLevel: number;
  entities?: Entity[];
  level: (Tile | Entity | Player)[][];
  player?: Player;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.size =
      window.innerWidth < window.innerHeight
        ? window.innerWidth
        : window.innerHeight;

    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    this.currentLevel = 0;
    this.entities = undefined;
    this.level = this.loadLevel(levels[this.currentLevel]);
  }

  setLevel(count?: number) {
    resetKeys();
    this.currentLevel = this.currentLevel + (count ?? 1);

    if (this.currentLevel > levels.length - 1 || this.currentLevel < 0) {
      this.currentLevel = 0;
    }

    this.level = this.loadLevel(levels[this.currentLevel]);
  }

  loadLevel(lev: string[]) {
    const levelData = lev.map((row) => row.replace(/\s/g, ""));

    const tileSize = Math.floor(this.size / levelData.length);
    this.canvas.width = tileSize * levelData.length;
    this.canvas.height = tileSize * levelData[0].length;

    this.entities = [];

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
          case "l":
            this.entities?.push(
              new Patroller(x, y, {
                direction: "x",
                color: "#bad",
              })
            );
            return new Tile(x, y);
          case "u":
            this.entities?.push(
              new Patroller(x, y, {
                direction: "y",
                color: "#bed",
              })
            );
            return new Tile(x, y);
          case "p":
            this.player = new Player(x, y);
            this.entities?.push(this.player);
            return new Tile(x, y);
          default:
            return new Tile(x, y);
        }
      });

      return rowEntities;
    });

    this.entities.forEach((entity) => {
      entity.setWorld(this);
    });

    return level;
  }

  tick() {
    this.player?.tick();
    this.render();
  }

  render() {
    this.ctx?.clearRect(0, 0, this.size, this.size);
    const tileSize = Math.floor(this.size / this.level.length);

    this.level.forEach((column) => {
      column.forEach((row) => {
        row.render(this.ctx, tileSize);
      });
    });

    this.entities?.forEach((entity) => {
      entity.render(this.ctx, tileSize);
    });
  }

  update() {
    return new Promise((resolve, reject) => {
      const entities = this.entities?.filter((ent) => ent.update) ?? [];

      if (entities.length === 0) {
        setTimeout(resolve, 200);
      }

      const entityTime = 200 / entities.length;

      entities
        .sort((a, b) => {
          if (a.y < b.y) {
            return -1;
          }

          if (b.y < a.y) {
            return 1;
          }

          if (a.x < b.x) {
            return -1;
          }

          if (b.x < a.x) {
            return 1;
          }

          return 0;
        })
        .forEach((entity, i, arr) => {
          setTimeout(() => {
            entity.update?.();
            if (i === arr.length - 1) {
              resolve();
            }
          }, i * entityTime);
        });

      console.log("updated :D");
    });
  }
}

export default World;
