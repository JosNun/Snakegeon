import React from "react";
import clsx from "clsx";
import { LevelData } from "../types";
import { EntityType } from "../types";

interface ToolPanelProps {
  levelData: LevelData;
  selectedEntityType: EntityType;
  onSizeChange: (size: number) => void;
  setSelectedEntityType: (tile: EntityType) => void;
}

export const ToolPanel: React.FC<ToolPanelProps> = ({
  levelData,
  selectedEntityType,
  onSizeChange,
  setSelectedEntityType,
}) => {
  return (
    <div className="panel tool-panel">
      I'm the side
      <div>
        <label>
          World Size: {levelData.size}
          <input
            type="range"
            value={levelData.size}
            min="2"
            max="32"
            step="1"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              onSizeChange(parseInt(e.target.value));
            }}
          />
        </label>
      </div>
      <div className="entity-buttons">
        {Object.keys(EntityType).map((key) => {
          return (
            <button
              key={key}
              className={clsx(
                "entity-button",
                EntityType[key as keyof typeof EntityType] ===
                  selectedEntityType && "selected"
              )}
              onClick={() => {
                setSelectedEntityType(
                  EntityType[key as keyof typeof EntityType]
                );
              }}
            >
              {key}
            </button>
          );
        })}
      </div>
    </div>
  );
};
