import './App.css';
import HomePage from './components/HomePage';
import VariantsTicTacToe from './components/VariantsTicTacToe';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login';
import Signup from './components/Signup';
import NotFound from './components/NotFound';
import TicTacToe2Player from './components/TicTacToe2Player';
import TicTacToeAI from './components/TicTacToeAI';
import Sudoku from './components/Sudoku';
import SudokuAPI from './components/SudokuAPI';
import Wordle from './components/Wordle';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tic-tac-toe" element={<VariantsTicTacToe />} />
        <Route path="/tic-tac-toe/2-player" element={<TicTacToe2Player />} />
        <Route path="/tic-tac-toe/AI" element={<TicTacToeAI />} />
        <Route path="/sudoku" element={<Sudoku />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/wordle" element={<Wordle />} />

        <Route path="*" element={<NotFound />} />

        {/* <Route path="/ultimate" element={<UltimateTicTacToe />} /> */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;
