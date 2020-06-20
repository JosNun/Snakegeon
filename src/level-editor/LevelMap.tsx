import React, { useEffect, useState, useRef } from "react";
import { LevelData } from "../types";
import { cx, css } from "emotion";
import { debounce } from "lodash-es";

interface LevelMapProps {
  levelData: LevelData;
}

export const LevelMap: React.FC<LevelMapProps> = ({ levelData }) => {
  const [updateCount, setForceUpdate] = useState(0);
  const editorEl = useRef<HTMLDivElement | null>(null);
  const [tileSize, setTileSize] = useState<number>();

  const generateLevelMap = () => {
    const tiles = [];

    for (let i = 0; i < levelData.size; i++) {
      for (let j = 0; j < levelData.size; j++) {
        tiles.push(
          <div
            key={`x${i}-y${j}`}
            className={cx(
              "world-tile",
              css({
                width: tileSize,
                height: tileSize,
              })
            )}
          ></div>
        );
      }
    }

    return tiles;
  };

  useEffect(() => {
    const onResize = debounce(() => {
      setForceUpdate((x) => x + 1);
    }, 250);
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    document.body.style.setProperty("--world-size", levelData.size.toString());
    if (editorEl.current) {
      const bounds = editorEl.current?.getBoundingClientRect();
      const width = bounds?.width;
      const height = window.innerHeight;

      const tileSize = Math.min(width, height) / levelData.size;
      setTileSize(tileSize);
    }
  }, [levelData.size, updateCount]);

  return (
    <div className="editor-area">
      <div ref={editorEl} className="world-map">
        {generateLevelMap()}
      </div>
    </div>
  );
};
