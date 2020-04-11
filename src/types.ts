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
