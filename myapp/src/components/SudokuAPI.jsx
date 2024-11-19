// import React, { useEffect, useState } from "react";
// import Sudoku from '../components/Sudoku'

// const SudokuAPI = () => {
//     const [sudokuBoard, setSudokuBoard] = useState(null);
//     const [editableCells, setEditableCells] = useState(null); 
//     const [selectedCell, setSelectedCell] = useState(null); // Tracks the currently selected cell

//     useEffect(() => {
//         // Fetch data from the API
//         const fetchSudokuBoard = async () => {
//             try {
//                 const response = await fetch(
//                     "https://sudoku-api.vercel.app/api/dosuku"
//                 );
//                 const data = await response.json();
//                 console.log(data)
//                 // Extract the board from the API response
//                 const board = data.newboard.grids[0].value;
//                 console.log(board)
//                 if (board) {
//                     setSudokuBoard(board);
//                     const editable = board.map(row => row.map(cell => cell === 0));
//                     setEditableCells(editable);
//                 }
//             } catch (error) {
//                 console.error("Error fetching Sudoku board:", error);
//             }
//         };

//         fetchSudokuBoard();
//     }, []);

//     useEffect(() => {
//         // Keydown listener for number input
//         const handleKeyDown = (e) => {
//             if (!selectedCell || !editableCells) return;

//             const { rowIndex, colIndex } = selectedCell;
//             const number = parseInt(e.key, 10);

//             // Validate input (1-9)
//             if (number >= 1 && number <= 9) {
//                 setSudokuBoard(prevBoard => {
//                     const newBoard = [...prevBoard];
//                     newBoard[rowIndex] = [...newBoard[rowIndex]];
//                     newBoard[rowIndex][colIndex] = number;
//                     return newBoard;
//                 });
//             }
//         };

//         window.addEventListener("keydown", handleKeyDown);
//         return () => window.removeEventListener("keydown", handleKeyDown);
//     }, [selectedCell, editableCells]);

//     const handleCellClick = (rowIndex, colIndex) => {
//         // Only allow selection of editable cells
//         if (editableCells[rowIndex][colIndex]) {
//             setSelectedCell({ rowIndex, colIndex });
//         }
//     };

//     return (
//         <div>
//             {console.log(sudokuBoard)}
//             {sudokuBoard ? (
//                 <Sudoku board={sudokuBoard}, editableCells = { editableCells }, selectedCell = { selectedCell }, handleCellClick = { handleCellClick() }} />
//             ) : (
//                 <p>Loading Sudoku board...</p>
//             )}
//         </div>
//     );
// };

// export default SudokuAPI;
