import React, { useState } from 'react';
import Board from './Board';
import calculateWinner from './calculateWinner';
import { Button, Box } from '@mui/material';
import CachedIcon from '@mui/icons-material/Cached';

interface HistoryItem {
  squares: (string | null)[];
}

const Game: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);
  const xIsNext = stepNumber % 2 === 0;

  const handleClick = (i: number) => {
    const newHistory = history.slice(0, stepNumber + 1);
    const currentSquares = current.squares.slice();
    if (winner || currentSquares[i]) {
      return;
    }
    currentSquares[i] = xIsNext ? 'X' : 'O';
    setHistory(newHistory.concat([{ squares: currentSquares }]));
    setStepNumber(newHistory.length);
  };

  let status: JSX.Element | string;
  if (winner) {
    status = <p style={{ fontSize: '1.5rem' , color : '#6000ff' }}>Winner: {winner}</p>;
  } else if (stepNumber === 9) {
    status = <p style={{ fontSize: '1.5rem' , color : 'red' }}>Nobody wins.<br/> Restart the game.</p> ;
  } else {
    status = <p style={{ fontSize: '1.5rem' }}>Next Player: {xIsNext  ? <span>X</span> : <span>O</span>}</p>
  }

  return (
    <Box className="game">
      <Box className="game-board">
        <Board squares={current.squares} onClick={handleClick} />
      </Box>
      <Box className="game-info">
        <Box>
          {status}
        </Box>
        <Button color={winner ? "success" : "warning"} onClick={() => setStepNumber(0)} variant="outlined" endIcon={<CachedIcon />}>
          {
            winner ? "Start Again" : "Restart the game"
          }
        </Button>
      </Box>
    </Box>
  );
};

export default Game;
