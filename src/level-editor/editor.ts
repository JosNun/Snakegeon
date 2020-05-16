import { EntityType } from "../types";

let worldSize = 16;
document.body.style.setProperty("--world-size", worldSize.toString());

let selectedEntity = EntityType.Wall;

const toolPanel = document.querySelector(".tool-panel") as HTMLDivElement;
const worldMap = document.querySelector(".world-map");

const entityButtons = document.createElement("div");
entityButtons.classList.add("entity-buttons");

toolPanel.appendChild(entityButtons);

function handleEntityTypeSelection(e: MouseEvent, type: EntityType) {
  selectedEntity = type;

  const selectedButton = document.querySelector(".entity-button.selected");

  selectedButton?.classList.remove("selected");

  (e.target as HTMLButtonElement | undefined)?.classList.add("selected");
}

Object.keys(EntityType).forEach((entity) => {
  const btn = document.createElement("button");
  const type: EntityType = EntityType[
    (entity as any) as keyof typeof EntityType
  ] as any;

  btn.innerText = entity;
  btn.classList.add("entity-button");
  if (type === selectedEntity) {
    btn.classList.add("selected");
  }

  btn.onclick = (e) => handleEntityTypeSelection(e, type);

  entityButtons.appendChild(btn);
});

for (let i = 0; i < worldSize; i++) {
  for (let j = 0; j < worldSize; j++) {
    const tile = document.createElement("div");
    tile.classList.add("world-tile");

    worldMap?.appendChild(tile);
  }
}
