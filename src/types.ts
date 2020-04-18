export interface TileMeta {
  color?: string;
  isSolid?: boolean;
  isPortal?: boolean;
  isDeadly?: boolean;
}

export interface PatrollerMeta extends TileMeta {
  direction: "x" | "y";
  heading: 1 | -1;
}

export enum EntityType {
  Wall = "WALL",
  PatrollerLeft = "PATROLLER_LEFT",
  PatrollerUp = "PATROLLER_UP",
  Player = "PLAYER",
  Portal = "PORTAL",
  Magma = "MAGMA",
}

export interface LevelData {
  size: number;
  tiles: {
    x: number;
    y: number;
    type: EntityType;
  }[];
}
