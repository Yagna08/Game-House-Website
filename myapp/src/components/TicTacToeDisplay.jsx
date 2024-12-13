import React from 'react'
import ticTacToeImage from '../Images/illustration-of-hand-drawn-tic-tac-toe-competition-2G3KD67.jpg'
import { Link } from "react-router-dom";

const TicTacToeDisplay = () => {
  return (
    <div>
      <section class="text-gray-600 body-font mt-16">
        <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              Tic Tac Toe&nbsp;
              <br class="hidden lg:inline-block" />
              and their variants
            </h1>
            <p class="mb-5 leading-relaxed">
              Tic-tac-toe is a game in which two players take turns in drawing
              either an 'O' or a 'X' in one square of a grid consisting of nine
              squares. The winner is the first player to get three of the same
              symbols in a row.
            </p>
            <span>Click on Variants to check out other variants of Tic Tac Toe to play.</span>
            <br />
            <div class="flex justify-center">
              <Link to="/tic-tac-toe" >
              <button class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                Variants
                </button>
              </Link>
            </div>
          </div>
          <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img
              class="object-cover object-center rounded"
              alt="hero"
              src={ticTacToeImage}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default TicTacToeDisplay
