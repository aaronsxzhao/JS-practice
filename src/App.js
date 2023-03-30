import "./styles.css";
import React, { useState } from "react";

function Board({ initialConfiguration, onSolveCallback }) {
  const [tiles, setTiles] = useState(initialConfiguration);

  const handleTileClick = (index) => {
    if (index % 4 !== 0 && tiles[index - 1] === 0) {
      // Move tile to the left
      setTiles((prevTiles) => {
        const newTiles = [...prevTiles];
        [newTiles[index], newTiles[index - 1]] = [
          newTiles[index - 1],
          newTiles[index],
        ];
        return newTiles;
      });
    } else if ((index + 1) % 4 !== 0 && tiles[index + 1] === 0) {
      // Move tile to the right
      setTiles((prevTiles) => {
        const newTiles = [...prevTiles];
        [newTiles[index], newTiles[index + 1]] = [
          newTiles[index + 1],
          newTiles[index],
        ];
        return newTiles;
      });
    } else if (index > 3 && tiles[index - 4] === 0) {
      // Move tile up
      setTiles((prevTiles) => {
        const newTiles = [...prevTiles];
        [newTiles[index], newTiles[index - 4]] = [
          newTiles[index - 4],
          newTiles[index],
        ];
        return newTiles;
      });
    } else if (index < 12 && tiles[index + 4] === 0) {
      // Move tile down
      setTiles((prevTiles) => {
        const newTiles = [...prevTiles];
        [newTiles[index], newTiles[index + 4]] = [
          newTiles[index + 4],
          newTiles[index],
        ];
        return newTiles;
      });
    }
  };

  const isSolved = tiles.every((tile, index) => tile === index);

  if (isSolved) {
    onSolveCallback();
  }

  return (
    <div className="board">
      {tiles.map((tile, index) => (
        <div
          key={index}
          className={`tile ${tile === 0 ? "empty" : ""}`}
          onClick={() => handleTileClick(index)}
        >
          {tile !== 0 ? tile : ""}
        </div>
      ))}
    </div>
  );
}

export default Board;
