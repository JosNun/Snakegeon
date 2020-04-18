import Tile from "./Tile";
import Player from "./Player";
const levels: LevelData[] = require("./data/levels.json");
import Patroller from "./Patroller";
import { reset as resetKeys } from "./keys";
import Entity from "./Entity";
import { LevelData, EntityType } from "./types";
import { isEntity } from "./utils";

class World {
  canvas: HTMLCanvasElement;
  size: number;
  ctx: CanvasRenderingContext2D;
  currentLevel: number;
  currentLevelData: LevelData;

  player?: Player;
  tiles: (Tile | Entity | Player)[];

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.size =
      window.innerWidth < window.innerHeight
        ? window.innerWidth
        : window.innerHeight;

    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    this.currentLevel = 0;
    this.currentLevelData = levels[this.currentLevel];
    this.tiles = this.loadLevel(this.currentLevelData);
  }

  setLevel(count?: number) {
    resetKeys();
    this.currentLevel = this.currentLevel + (count ?? 1);

    if (this.currentLevel > levels.length - 1 || this.currentLevel < 0) {
      this.currentLevel = 0;
    }
    this.currentLevelData = levels[this.currentLevel];
    this.tiles = this.loadLevel(this.currentLevelData);
  }

  loadLevel(lev: LevelData) {
    const tileSize = Math.floor(this.size / lev.size);
    this.canvas.width = tileSize * lev.size;
    this.canvas.height = tileSize * lev.size;

    const tiles = lev.tiles.map((tile) => {
      const { type, x, y } = tile;

      switch (type) {
        case EntityType.Wall:
          return new Tile(x, y, {
            color: "#000",
            isSolid: true,
          });
        case EntityType.Magma:
          return new Tile(x, y, {
            color: "#ff3310",
            isDeadly: true,
          });
        case EntityType.Portal:
          return new Tile(x, y, {
            color: "#a000c0",
            isPortal: true,
          });
        case EntityType.PatrollerLeft:
          return new Patroller(x, y, {
            direction: "x",
            color: "#bad",
          });
        case EntityType.PatrollerUp:
          return new Patroller(x, y, {
            direction: "y",
            color: "#bed",
          });
        case EntityType.Player:
          this.player = new Player(x, y);
          return this.player;
        default:
          return ((x: never): never => {
            throw new Error(`Unknown type: ${x}`);
          })(type);
      }
    });

    tiles.forEach((tile) => {
      if (tile instanceof Entity) {
        tile.setWorld(this);
      }
    });

    return tiles;
  }

  tick() {
    this.player?.tick();
    this.render();
  }

  render() {
    this.ctx.fillStyle = "#f7ca72";
    this.ctx?.fillRect(0, 0, this.size, this.size);
    const levelSize = this.currentLevelData.size;
    const tileSize = Math.floor(this.size / levelSize);

    this.tiles.forEach((tile) => {
      tile.render(this.ctx, tileSize);
    });
  }

  update() {
    return new Promise((resolve, reject) => {
      const entities =
        this.tiles?.filter(isEntity).filter((ent) => ent.update) ?? [];

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
