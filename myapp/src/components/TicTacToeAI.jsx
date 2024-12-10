import React, { useState } from "react";
import { toast } from 'react-toastify';

const TicTacToeAI = () => {
    const [board, setBoard] = useState(Array(9).fill(''))
    const [turn, setTurn] = useState('X')
    const [gameOver, setGameOver] = useState(false)
    const [winner, setWinner] = useState('')
    const [score, setScore] = useState({ x: 0, o: 0 })
    const WIN_POSITION = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    const dangers = [['x', '', '', '', 'o', '', '', '', 'x'], ['', '', 'x', '', 'o', '', 'x', '', ''], ['', '', 'x', 'x', 'o', '', '', '', ''],
    ['x', '', '', '', 'o', 'x', '', '', ''], ['', '', '', 'x', 'o', '', '', '', 'x'], ['', '', '', '', 'o', 'x', 'x', '', ''],
    ['', '', '', '', 'o', 'x', '', 'x', ''], ['x', '', '', '', 'o', '', '', 'x', ''], ['', '', 'x', '', 'o', '', '', 'x', '']]
    const counterDangerMove = [1, 3, 0, 3, 6, 8, 8, 6, 8]
    let move = false
    let compMove = 4
    const checkWinner = (board) => {
        if (winner === '') {
            for (let i = 0; i < WIN_POSITION.length; i++) {
                const [x, y, z] = WIN_POSITION[i];
                if (board[x] && board[x] === board[y] && board[y] === board[z]) {
                    toast.success(board[x] + " Won");
                    setGameOver(true);
                    setWinner(board[x])
                    return;
                }
            }
            const allFilled = board.every((value) => value !== '');
            if (allFilled) {
                toast.success("It's a TIE");
                setWinner('Tie')
                setGameOver(true)
            }
        }
    }

    const reset = () => {
        setGameOver(false)
        setBoard(Array(9).fill(''))
        setWinner('')
        setTurn('X')
    }

    const checkDangerPos = (tempBoard) => {
        // console.log(tempBoard)
        for (let i = 0; i < dangers.length; i++) {
            if (tempBoard == dangers[i].toLowerCase) {
                compMove = counterDangerMove[i]
                move = false
            }
        }
    }

    const Winner = (player, tempBoard) => {
        for (let i of WIN_POSITION) {
            if (tempBoard[i[0]] === player && tempBoard[i[1]] === player && tempBoard[i[2]] === '') {
                compMove = i[2]
                move = false
            }
            else if (tempBoard[i[0]] === player && tempBoard[i[1]] === '' && tempBoard[i[2]] === player) {
                compMove = i[1]
                move = false
            }
            else if (tempBoard[i[0]] === '' && tempBoard[i[1]] === player && tempBoard[i[2]] === player) {
                compMove = i[0]
                move = false
            }
        }
    }

    const checkCentre = (tempBoard) => {
        if (tempBoard[4] == '') {
            compMove = 4;
            move = false;
        }
    }

    const checkCorner = (tempBoard) => {
        for (let i = 0; i <= 8; i += 2) {
            if (i != 4) {
                if (tempBoard[i] === '') {
                    compMove = i;
                    move = false;
                    break;
                }
            }
        }
    }

    const checkEdge = (tempBoard) => {
        for (let i = 1; i <= 7; i += 2) {
            if (tempBoard[i] === '') {
                compMove = i;
                move = false;
                break;
            }
        }
    }
    const compMoves = (tempBoard) => {
        move = true
        if (move) Winner('O', tempBoard)
        if (move) Winner('X', tempBoard)

        if (move) checkDangerPos(tempBoard)
        // console.log(move)
        if (move) checkCentre(tempBoard)
        if (move) checkCorner(tempBoard)
        if (move) checkEdge(tempBoard)

        if (!move) {
            const updateBoard = tempBoard.map((value, idx) => {

                if (idx == compMove && value === '') {
                    return 'O';
                }
                else {
                    return value;
                }
            })
            checkWinner(updateBoard)
            if (!gameOver)
                setBoard(updateBoard)
            else
                reset()
        }
    }

    const handleClick = (index) => {
        const updateBoard = board.map((value, idx) => {
            if (idx == index && value === '') {
                return turn;
            }
            else {
                return value;
            }
        })
        checkWinner(updateBoard)
        if (winner === 'X') {
            let { x } = score;
            x += 1
            setScore({ ...score, x })
        }
        else if (winner === 'O') {
            let { o } = score;
            o += 1
            setScore({ ...score, o })
        }
        else if (winner === 'Tie') {
            let { o, x } = score;
            x += 0.5
            o += 0.5
            let temp = { x: x, o: o }
            setScore(temp)
        }
        if (!gameOver) {
            setBoard(updateBoard)
            compMoves(updateBoard)
        }

        else
            reset()
    }
    let styleX = turn === 'X' ? "w-full text-center p-own text-red-600 rounded-bl-lg border-red-600 border-b-4" : "w-full text-center p-own text-red-600 rounded-bl-lg border-red-600"
    let styleO = turn === 'O' ? "w-full text-center p-own text-blue-600 rounded-br-lg border-blue-600 border-b-4" : "w-full text-center p-own text-blue-600 rounded-bl-lg border-blue-600"

    return (
        <>
            <div className="flex flex-row items-center justify-evenly w-80 m-own shadow-bs-1 text-2xl rounded-lg font-bold">

                <span className={styleX}>You - {score.x}</span>
                <span className={styleO}>AI - {score.o}</span>

            </div>
            <div className="grid grid-cols-3 place-items-center justify-center">
                {
                    board.map((value, index) => {
                        let box_style = value === 'X' ? "bg-white border-none rounded-[10%] shadow-bs-1 w-20 h-20 text-center text-5rem m-2 font-bold text-red-600 " : "bg-white border-none rounded-[10%] shadow-bs-1 w-20 h-20 text-center text-5rem m-2 font-bold text-blue-600 "
                        box_style = (value === '') ? box_style + ' hover::after content-' + turn + ' opacity-40' : box_style;
                        return <button className={box_style} onClick={() => { handleClick(index) }}>{value}</button>;
                    })
                }
            </div>
            <button className="bg-green-400 border-none rounded-lg text-2xl m-btn block p-btn" onClick={reset}>Reset</button>
        </>
    );
};

export default TicTacToeAI;
