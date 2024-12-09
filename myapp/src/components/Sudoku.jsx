import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';

const App = () => {
    const [sudokuBoard, setSudokuBoard] = useState(null);
    const [editableCells, setEditableCells] = useState(null); // Tracks editable cells
    const [selectedCell, setSelectedCell] = useState(null); // Tracks the currently selected cell
    const [showAlert, setShowAlert] = useState(false); // Control alert visibility
    const [originalBoard, setOriginalBoard] = useState(null);
    const [solutionBoard, setSolutionBoard] = useState(null);
    const [selectedNumber, setSelectedNumber] = useState(null); // Tracks the selected number

    useEffect(() => {
        const fetchSudokuBoard = async () => {
            try {
                const response = await fetch("https://sudoku-api.vercel.app/api/dosuku");
                const data = await response.json();

                const board = data.newboard.grids[0].value;
                const solution = data.newboard.grids[0].solution;
                if (board) {
                    setSudokuBoard(board);
                    setOriginalBoard(board);
                    setSolutionBoard(solution);
                    const editable = board.map(row => row.map(cell => cell === 0));
                    setEditableCells(editable);
                }
            } catch (error) {
                console.error("Error fetching Sudoku board:", error);
            }
        };

        fetchSudokuBoard();
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!selectedCell || !editableCells) return;

            const { rowIndex, colIndex } = selectedCell;
            const number = parseInt(e.key, 10);

            if (editableCells[rowIndex][colIndex] && number >= 1 && number <= 9) {
                setSudokuBoard(prevBoard => {
                    const newBoard = [...prevBoard];
                    newBoard[rowIndex] = [...newBoard[rowIndex]];
                    newBoard[rowIndex][colIndex] = number;
                    return newBoard;
                });
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedCell, editableCells]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if ((event.ctrlKey && event.key === "r") || event.key === "F5") {
                event.preventDefault();
                setShowAlert(true);
            }
        };

        const handleBeforeUnload = (event) => {
            event.preventDefault();
            event.returnValue = '';
            return "";
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("beforeunload", handleBeforeUnload, { passive: false });

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);

    const handleOkClick = () => {
        setShowAlert(false);
        setTimeout(() => {
            window.location.reload();
        }, 0);
    };

    const handleDismissClick = () => {
        setShowAlert(false);
    };

    const handleCellClick = (rowIndex, colIndex) => {
        setSelectedCell({ rowIndex, colIndex });
    };

    const isBoardsEqual = (solutionBoard, sudokuBoard) => {
        if (!solutionBoard || !sudokuBoard || solutionBoard.length !== sudokuBoard.length) {
            return false;
        }

        for (let i = 0; i < solutionBoard.length; i++) {
            if (solutionBoard[i].length !== sudokuBoard[i].length) {
                return false;
            }
            for (let j = 0; j < solutionBoard[i].length; j++) {
                if (solutionBoard[i][j] !== sudokuBoard[i][j]) {
                    return false;
                }
            }
        }

        return true;
    };

    const handleCheckClick = () => {
        if (isBoardsEqual(solutionBoard, sudokuBoard)) {
            toast.success("You nailed it! Your Sudoku solution is flawless!");
        } else {
            toast.error("Hmm, that's not correct. Take another look!");
        }
    };

    const handleNumberClick = (num) => {
        setSelectedNumber(num);
        if (selectedCell) {
            const { rowIndex, colIndex } = selectedCell;
            if (editableCells[rowIndex][colIndex]) {
                setSudokuBoard(prevBoard => {
                    const newBoard = [...prevBoard];
                    newBoard[rowIndex] = [...newBoard[rowIndex]];
                    newBoard[rowIndex][colIndex] = num;
                    return newBoard;
                });
            }
        }
    };

    const handleResetClick = () => {
        if (originalBoard) {
            setSudokuBoard([...originalBoard]);
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <div className="flex flex-col items-center gap-6">
                    {sudokuBoard ? (
                        <div className="grid grid-cols-9 gap-[2px] border-2 border-black w-full max-w-xl">
                            {sudokuBoard.map((row, rowIndex) =>
                                row.map((cell, colIndex) => (
                                    <button
                                        key={`${rowIndex}-${colIndex}`}
                                        className={`flex items-center justify-center border border-black text-lg font-bold
                                            aspect-square
                                            ${editableCells[rowIndex][colIndex]
                                                ? selectedCell?.rowIndex === rowIndex && selectedCell?.colIndex === colIndex
                                                    ? "bg-blue-100"
                                                    : "bg-white"
                                                : selectedCell?.rowIndex === rowIndex && selectedCell?.colIndex === colIndex
                                                    ? "bg-blue-200"
                                                    : "bg-gray-200"}
                                            ${rowIndex % 3 === 2 && rowIndex !== 8 ? "border-b-2 border-black" : ""}
                                            ${colIndex % 3 === 2 && colIndex !== 8 ? "border-r-2 border-black" : ""}`}
                                        onClick={() => handleCellClick(rowIndex, colIndex)}
                                    >
                                        {cell === 0 ? "" : cell}
                                    </button>
                                ))
                            )}
                        </div>
                    ) : (
                        <p>Loading Sudoku board...</p>
                    )}

                    <div className="flex justify-center gap-1">
                        {Array.from({ length: 9 }, (_, i) => i + 1).map(num => (
                            <button
                                key={num}
                                className={`w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center text-xl font-bold
                                        ${num === selectedNumber ? "bg-blue-300" : "hover:bg-blue-100"}`}
                                onClick={() => handleNumberClick(num)}
                            >
                                {num}
                            </button>
                        ))}
                    </div>

            
                    <div className="flex flex-wrap justify-center gap-4">
                        <button
                            className="text-white bg-cyan-500 hover:bg-cyan-600 font-medium rounded-lg text-sm px-5 py-2.5"
                            onClick={handleCheckClick}
                        >
                            Check
                        </button>
                        <button
                            className="text-white bg-red-500 hover:bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5"
                            onClick={handleResetClick}
                        >
                            Reset
                        </button>
                        <button
                            className="text-white bg-green-500 hover:bg-green-600 font-medium rounded-lg text-sm px-5 py-2.5"
                            onClick={() => window.location.reload()}
                        >
                            New Game
                        </button>
                    </div>

                    {showAlert && (
                        <div
                            className="fixed top-0 left-0 w-full p-4 text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
                            role="alert"
                        >
                            <div className="flex items-center">
                                <svg
                                    className="flex-shrink-0 w-4 h-4 mr-2"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                </svg>
                                <span className="sr-only">Info</span>
                                <h3 className="text-lg font-medium">Are you sure you want to refresh?</h3>
                            </div>
                            <div className="mt-2 mb-4 text-sm">
                                Refreshing the page will reset the current Sudoku and generate a new one. Your progress will be lost.
                            </div>
                            <div className="flex gap-2">
                                <button
                                    className="text-white bg-red-800 hover:bg-red-900 font-medium rounded-lg text-xs px-3 py-1.5"
                                    onClick={handleOkClick}
                                >
                                    OK
                                </button>
                                <button
                                    className="text-red-800 border border-red-800 hover:bg-red-800 hover:text-white font-medium rounded-lg text-xs px-3 py-1.5"
                                    onClick={handleDismissClick}
                                >
                                    Dismiss
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default App;