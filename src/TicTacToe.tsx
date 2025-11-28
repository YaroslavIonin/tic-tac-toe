import React, {useState, JSX} from "react";
import "./TicTacToe.css";

type Player = "X" | "O";
type WinnerState = Player | "Draw" | null;

function Square({value, onClick}: { value: Player | null; onClick: () => void }) {
    return (
        <button className="cell" onClick={onClick}>
            {value}
        </button>
    );
}

export default function TicTacToe(): JSX.Element {
    const [board, setBoard] = useState<Array<Player | null>>(Array(9).fill(null));
    const [current, setCurrent] = useState<Player>("X");
    const [winner, setWinner] = useState<WinnerState>(null);

    function handleClick(i: number) {
        if (winner || board[i]) return;

        const newBoard = [...board];
        newBoard[i] = current;
        setBoard(newBoard);

        const w = calculateWinner(newBoard);
        if (w) {
            setWinner(w);
        } else if (newBoard.every((c) => c !== null)) {
            setWinner("Draw");
        } else {
            setCurrent(current === "X" ? "O" : "X");
        }
    }

    function reset() {
        setBoard(Array(9).fill(null));
        setCurrent("X");
        setWinner(null);
    }

    return (
        <div className="container">
            <h1>Крестики-нолики</h1>
            <div className="board">
                {board.map((value, i) => (
                    <Square
                        key={`cell-${i}`}
                        value={value}
                        onClick={() => handleClick(i)}
                    />
                ))}
            </div>

            <div className="panel">
                {winner ? (
                    winner === "Draw" ? <p>Ничья!</p> : <p>Победитель: {winner}</p>
                ) : (
                    <p>Ход: {current}</p>
                )}

                <div className="buttons">
                    <button onClick={reset}>Сброс</button>
                </div>

            </div>
        </div>
    );
}

function calculateWinner(squares: Array<Player | null>): Player | null {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let [a, b, c] of lines) {
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
