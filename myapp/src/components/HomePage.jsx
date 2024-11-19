import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import TicTacToeDisplay from '../components/TicTacToeDisplay'
import SudokuDisplay from './SudokuDisplay'
const HomePage = () => {
    return (
      <div>
        <Navbar />
        <TicTacToeDisplay />
        <hr className="h-0.5 border-0 bg-gray-800 text-gray-700" />
        <SudokuDisplay />
        <hr className="h-0.5 border-0 bg-gray-800 text-gray-700" />
        <Footer  />
      </div>
    );
}

export default HomePage
