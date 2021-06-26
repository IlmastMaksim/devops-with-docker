import React from "react";
import { useState, useEffect } from "react";
import Square from "./Square";

const GameStyle = {
  border: "4px solid black",
  borderRadius: "10px",
  width: "250px",
  height: "250px",
  margin: "0 auto",
  display: "grid",
  gridTemplate: "repeat(3, 1fr) / repeat(3, 1fr)",
};

const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const players = {
  first: "O",
  second: "X",
};

const Game = () => {
  const [winner, setWinner] = useState(null);
  const [turn, setTurn] = useState(players["first"]);
  const [selections, setSelections] = useState([...Array(9).fill(null)]);

  useEffect(() => {
    checkWinner();
  }, [turn]);

  const checkTurn = (val) => {
    const selectionsClone = [...selections];
    if (selectionsClone[val]) {
      return;
    }
    selectionsClone[val] = turn;
    setSelections(selectionsClone);
    setTurn(turn === players["first"] ? players["second"] : players["first"]);
  };

  const checkWinner = () => {
    let firstPlayerSelections = [];
    let secondPlayerSelections = [];
    selections.forEach((el, i) => {
      if (el === players["first"]) {
        firstPlayerSelections.push(i);
      }
      if (el === players["second"]) {
        secondPlayerSelections.push(i);
      }
    });
    firstPlayerSelections.sort();
    secondPlayerSelections.sort();
    winningLines.forEach((winningLine) => {
      if (
        winningLine.every(
          (value, index) => value === firstPlayerSelections[index]
        )
      ) {
        setWinner(players["first"]);
      }
      if (
        winningLine.every(
          (value, index) => value === secondPlayerSelections[index]
        )
      ) {
        setWinner(players["second"]);
      }
    });
  };

  const resetGame = () => {
    setWinner(null)
    setTurn(players["first"])
    setSelections([...Array(9).fill(null)])
  }

  return (
    <figure>
      <div style={GameStyle}>
        {selections.map((selection, i) => {
          return (
            <Square
              key={i}
              value={i}
              selection={selection}
              onClick={(val) => checkTurn(val)}
            />
          );
        })}
      </div>
      <div style={{ textAlign: "center" }}>
        {winner ? <h1>Player {winner} just won!</h1> : null}
        <p>
          First player - O
          <br />
          Second player - X
        </p>
        <button onClick={() => resetGame()}>Reset</button>
      </div>
    </figure>
  );
};

export default Game;
