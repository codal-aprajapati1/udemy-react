export default function GameBoard({ onSelectSquare, gameBoard }) {

    // const [gameBoard, setGameBoard] = useState(initialGameBoard);

    // function handSubmitClick(rowindex, colindex){
    //     setGameBoard((prevGameBoard) => {
    //         const updatedGameBoard = [...prevGameBoard.map((internalArray)=> [...internalArray])];
    //         updatedGameBoard[rowindex][colindex] = activePlayerSymbol;
    //         return updatedGameBoard;
    //     });
    //     onSelectSquare();

    // }

    return (
        <>
            <ol id="game-board">
                {gameBoard.map((row, rowIndex) =>
                    <li key={rowIndex}>
                        <ol>
                            {row.map((playerSymbol, colIndex) => <li key={colIndex}><button onClick={() => onSelectSquare(rowIndex, colIndex)} disabled={playerSymbol != null}>{playerSymbol}</button></li>)}
                        </ol>
                    </li>
                )}
            </ol>
        </>
    );
}