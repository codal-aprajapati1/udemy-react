import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from './components/Log';
import GameOver from "./components/GameOver.jsx";
import { WINNING_COMBINATIONS } from "./winnin-combinations.js";

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
}

const INITIALGAMEBOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

function deriveWinner(gameBoard, players){
  let winner = null;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

function deriveGameBoard(gameTurns){
  let gameBoard = [...INITIALGAMEBOARD.map(row => [...row])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function deriveActivePlayer(gameTruns) {
  let currentPlayer = 'X';

  if (gameTruns.length > 0 && gameTruns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;

}

function App() {
  const [gameTurns, setGameTruns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS)
  
  const activePlayer = deriveActivePlayer(gameTurns);

  const gameBoard = deriveGameBoard(gameTurns);

  const winner = deriveWinner(gameBoard, players);

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((currActivePlayer) => currActivePlayer === 'X' ? 'O' : 'X');
    setGameTruns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTruns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns];

      return updatedTruns;
    });
  }


  function handleRestart(){
    setGameTruns([]);
  }
  function handlePlayerNameChange(symbol, newName){
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    }
    )
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            isActive={activePlayer === 'X'}
            initialName={PLAYERS.X}
            onChangeName={handlePlayerNameChange}
            symbol='X' />
          <Player
            isActive={activePlayer === 'O'}
            initialName={PLAYERS.O}
            onChangeName={handlePlayerNameChange}
            symbol='O' />
        </ol>
        {(winner || hasDraw) && (<GameOver winner={winner} onRestart={handleRestart} />)}
        <GameBoard
          gameBoard={gameBoard}
          onSelectSquare={handleSelectSquare} />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
