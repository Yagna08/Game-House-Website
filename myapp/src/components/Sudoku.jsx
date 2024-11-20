import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';


const App = () => {
    const [sudokuBoard, setSudokuBoard] = useState(null);
    const [editableCells, setEditableCells] = useState(null); // Tracks editable cells
    const [selectedCell, setSelectedCell] = useState(null); // Tracks the currently selected cell
    const [showAlert, setShowAlert] = useState(false); // Control alert visibility
    const [allowRefresh, setAllowRefresh] = useState(false); // Control whether to refresh
    const [originalBoard, setOriginalBoard] = useState(null);
    const [solutionBoard, setSolutionBoard] = useState(null);
    const [showModal, setShowModal] = useState(false);

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
                const solution = data.newboard.grids[0].solution;
                console.log(solution)
                if (board) {
                    setSudokuBoard(board);
                    setOriginalBoard(board);
                    setSolutionBoard(solution);
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

            // Only allow updating editable cells with numbers 1-9
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

    // useEffect(() => {
    //     // Beforeunload listener to show custom alert
    //     const handleBeforeUnload = (e) => {
    //         if (!allowRefresh) {
    //             e.preventDefault();
    //             e.returnValue = ""; // Required for some browsers
    //             setShowAlert(true); // Show the alert
    //         }
    //     };

    //     window.addEventListener("beforeunload", handleBeforeUnload);
    //     return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    // }, [allowRefresh]);

    // const handleOkClick = () => {
    //     setAllowRefresh(true);
    //     setTimeout(() => {
    //         window.location.reload(); // Refresh the page without showing the modal again
    //     }, 0); // Trigger the refresh
    // };




    useEffect(() => {
        const handleKeyDown = (event) => {
            // Check if Ctrl+R is pressed
            if ((event.ctrlKey && event.key === "r") || event.key === "F5") {
                event.preventDefault(); // Prevent default reload
                setShowAlert(true); // Show custom reload modal
            }
        };
        
        const handleBeforeUnload = (event) => {
            event.preventDefault(); 
            event.returnValue = ''; 
            return ""; 
        };

        // // Attach keydown and beforeunload event listeners
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("beforeunload", handleBeforeUnload,{passive:false});

        // // Cleanup event listeners on unmount
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);
    const handleOkClick = () => {
        setShowAlert(false); // Close the modal
        setTimeout(() => {
            window.location.reload(); // Refresh the page without showing the modal again
        }, 0);
    };
    const handleDismissClick = () => {
        setShowAlert(false); // Close modal without reloading
    };




    // const handleDismissClick = () => {
    //     setShowAlert(false); // Close the alert
    // };

    const handleCellClick = (rowIndex, colIndex) => {
        // Allow selecting any cell but restrict editing in handleKeyDown
        setSelectedCell({ rowIndex, colIndex });
    };

    const isBoardsEqual = (solutionBoard, sudokuBoard) => {
        // Check if both boards are defined and have the same dimensions
        if (!solutionBoard || !sudokuBoard || solutionBoard.length !== sudokuBoard.length) {
            return false;
        }

        // Check if every row in the boards is the same
        for (let i = 0; i < solutionBoard.length; i++) {
            if (solutionBoard[i].length !== sudokuBoard[i].length) {
                return false; // Ensure that each row has the same length
            }
            for (let j = 0; j < solutionBoard[i].length; j++) {
                if (solutionBoard[i][j] !== sudokuBoard[i][j]) {
                    return false; // If any cell differs, return false
                }
            }
        }

        return true; // If no differences are found, boards are equal
    };

    const handleCheckClick = () => {
        console.log(sudokuBoard);
        if (isBoardsEqual(solutionBoard, sudokuBoard)) {
            toast("Correct");    
        }
        else {
            toast("Incorrect");
        }
    };

    const handleResetClick = () => {
        if (originalBoard) {
            setSudokuBoard([...originalBoard]); // Reset to the initial board
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="flex items-center gap-4">
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
                                                ? "bg-blue-100"
                                                : "bg-white"
                                            : selectedCell?.rowIndex === rowIndex &&
                                                selectedCell?.colIndex === colIndex
                                                ? "bg-blue-200"
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
                {/* Check Button */}
                <div className="flex flex-col items-center space-y-4">
                    <button
                        className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        onClick={handleCheckClick}
                    >
                        Check
                    </button>

                    {/* Reset Button */}
                    <button
                        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        onClick={handleResetClick}
                    >
                        Reset
                    </button>
                </div>
            </div>

            {/* Alert */}
            {showAlert && (
                <div
                    id="alert-additional-content-2"
                    className="fixed top-0 left-0 w-full p-4 mb-4 text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
                    role="alert"
                >
                    <div className="flex items-center">
                        <svg
                            className="flex-shrink-0 w-4 h-4 me-2"
                            aria-hidden="true"
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
                    <div className="flex">
                        <button
                            type="button"
                            className="text-white bg-red-800 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                            onClick={handleOkClick}
                        >
                            OK
                        </button>
                        <button
                            type="button"
                            className="text-red-800 bg-transparent border border-red-800 hover:bg-red-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-red-600 dark:border-red-600 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800"
                            onClick={handleDismissClick}
                        >
                            Dismiss
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
