import React, {useState, useEffect, JSX} from "react";
import "./TicTacToe.css";

type Player = "X" | "O";

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
    const [winner, setWinner] = useState<Player | "Draw" | null>(null);
    const [history, setHistory] = useState<{ move: number; player: Player }[]>([]);

    useEffect(() => {
        const w = calculateWinner(board);
        if (w) setWinner(w);
        else if (board.every((c) => c !== null)) setWinner("Draw");
    }, [board]);

    function handleClick(i: number) {
        if (winner || board[i]) return;
        const newBoard = board.slice();
        newBoard[i] = current;
        setHistory([...history, {move: i, player: current}]);
        setBoard(newBoard);
        setCurrent(current === "X" ? "O" : "X");
    }

    function reset() {
        setBoard(Array(9).fill(null));
        setCurrent("X");
        setWinner(null);
        setHistory([]);
    }

    function undo() {
        if (history.length === 0) return;
        const last = history[history.length - 1];
        const newBoard = board.slice();
        newBoard[last.move] = null;
        setBoard(newBoard);
        setHistory(history.slice(0, -1));
        setCurrent(last.player);
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
                    <button onClick={undo}>Отменить ход</button>
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
