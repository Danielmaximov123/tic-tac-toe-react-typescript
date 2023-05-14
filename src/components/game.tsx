import React, { useState } from 'react';
import Board from './Board';
import calculateWinner from './calculateWinner';
import { Button , Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

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

  const status = winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <Box className="game">
      <Box className="game-board">
        <Board squares={current.squares} onClick={handleClick} />
      </Box>
      <Box className="game-info">
        <Box>{status}</Box>
        <Button onClick={() => setStepNumber(0)}>Restart the game</Button>
      </Box>
    </Box>
  );
};

export default Game;
