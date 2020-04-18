import Entity from "./Entity";

export function isEntity(ent: any): ent is Entity {
  return ent instanceof Entity;
}
