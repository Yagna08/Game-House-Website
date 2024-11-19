import React, { useEffect, useState } from "react";

const App = () => {
    const [sudokuBoard, setSudokuBoard] = useState(null);
    const [editableCells, setEditableCells] = useState(null); // Tracks editable cells
    const [selectedCell, setSelectedCell] = useState(null); // Tracks the currently selected cell

    useEffect(() => {
        // Fetch data from the API
        const fetchSudokuBoard = async () => {
            try {
                const response = await fetch(
                    "https://sudoku-api.vercel.app/api/dosuku"
                );
                const data = await response.json();

                // Extract the board from the API response
                const board = data.newboard.grids[0].value;
                if (board) {
                    setSudokuBoard(board);

                    // Mark editable cells (cells with 0 are editable)
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
        // Keydown listener for number input
        const handleKeyDown = (e) => {
            if (!selectedCell || !editableCells) return;

            const { rowIndex, colIndex } = selectedCell;
            const number = parseInt(e.key, 10);

            // Validate input (1-9)
            if (number >= 1 && number <= 9) {
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

    const handleCellClick = (rowIndex, colIndex) => {
        // Only allow selection of editable cells
        if (editableCells[rowIndex][colIndex]) {
            setSelectedCell({ rowIndex, colIndex });
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            {sudokuBoard ? (
                <div className="grid grid-cols-9 gap-0 border-3 border-black w-96 h-96">
                    {sudokuBoard.map((row, rowIndex) =>
                        row.map((cell, colIndex) => (
                            <button
                                key={`${rowIndex}-${colIndex}`}
                                className={`flex items-center justify-center border border-black text-lg font-bold 
                                    h-10 w-10 
                                    ${editableCells[rowIndex][colIndex]
                                        ? selectedCell?.rowIndex === rowIndex &&
                                            selectedCell?.colIndex === colIndex
                                            ? "bg-blue-100" // Highlight selected cell
                                            : "bg-white"
                                        : "bg-gray-200"
                                    } 
                                    ${rowIndex % 3 === 2 && rowIndex !== 8 ? "border-b-3 border-black" : ""} 
                                    ${colIndex % 3 === 2 && colIndex !== 8 ? "border-r-3 border-black" : ""}`}
                                onClick={() => handleCellClick(rowIndex, colIndex)}
                            >
                                {cell === 0 ? " " : cell}
                            </button>
                        ))
                    )}
                </div>
            ) : (
                <p>Loading Sudoku board...</p>
            )}
        </div>
    );
};

export default App;
