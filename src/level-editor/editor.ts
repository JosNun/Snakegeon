import { EntityType } from "../types";

let worldSize = 16;
document.body.style.setProperty("--world-size", worldSize.toString());

const toolPanel = document.querySelector(".tool-panel") as HTMLDivElement;
const worldMap = document.querySelector(".world-map");

const entityButtons = document.createElement("div");
entityButtons.classList.add("entity-buttons");

toolPanel.appendChild(entityButtons);

Object.keys(EntityType).forEach((entity) => {
  const btn = document.createElement("button");
  btn.innerText = entity;
  btn.classList.add("entity-button");

  entityButtons.appendChild(btn);
});

for (let i = 0; i < worldSize; i++) {
  for (let j = 0; j < worldSize; j++) {
    const tile = document.createElement("div");
    tile.classList.add("world-tile");

    worldMap?.appendChild(tile);
  }
}
