import React, { useState } from "react";

const TicTacToe2Player = () => {
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

  const checkWinner = (board) => {
    if (winner === '') {
      for (let i = 0; i < WIN_POSITION.length; i++) {
        const [x, y, z] = WIN_POSITION[i];
        if (board[x] && board[x] === board[y] && board[y] === board[z]) {
          setGameOver(true);
          setWinner(board[x])
          return;
        }
      }
      const allFilled = board.every((value) => value !== '');
      if (allFilled) {
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

  const handleClick = (index) => {
    const updateBoard = board.map((value, idx) => {
      if (idx == index && value === '') {
        if (turn === 'X')
          setTurn('O')
        else
          setTurn('X')
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
      console.log(temp)
      setScore(temp)
    }
    if (!gameOver)
      setBoard(updateBoard)
    else
      reset()
  }
  return (
    <>
      <div className="flex flex-row items-center justify-evenly w-80 m-own shadow-bs-1 text-2xl rounded-lg font-bold">
        <span className="w-full text-center p-own text-red-600 rounded-bl-lg border-red-600 border-b-4">X - {score.x}</span>
        <span className="w-full text-center p-own text-blue-600 rounded-br-lg border-blue-600 border-b-4">O - {score.o}</span>
      </div>
      <div className="grid grid-cols-3 place-items-center justify-center">
        {
          
          board.map((value, index) => {
            console.log(value)
            let box_style = value === 'X' ? "bg-white border-none rounded-[10%] shadow-bs-1 w-20 h-20 text-center text-5rem m-2 font-bold text-red-600 hover:shadow-bs-1-hover" : "bg-white border-none rounded-[10%] shadow-bs-1 w-20 h-20 text-center text-5rem m-2 font-bold text-blue-600 hover:shadow-bs-1-hover"
            return <button className={box_style} onClick={() => { handleClick(index) }}>{value}</button>;
          })
        }
      </div>
      <button className="bg-green-400 border-none rounded-lg text-2xl m-btn block p-btn" onClick={reset}>Reset</button>
    </> 
  );
};

export default TicTacToe2Player;
