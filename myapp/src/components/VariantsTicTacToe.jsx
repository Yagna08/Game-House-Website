import React from "react";
import Navbar from "./Navbar";
import ticTacToeCard from "../Images/TicTacToeCard.png";
import { Link } from 'react-router-dom'

import Footer from "./Footer";

export default function CardComponent() {
  const [showModal, setShowModal] = React.useState(false);

  const posts = [
    {
      title: "2 Player Tic Tac Toe",
      img: ticTacToeCard,
      content:
        "This is Simple 2 Player Tic Tac Toe.You can play with your friends",
      Link:'/tic-tac-toe/2-player',
      rules:
        "Players take turns putting their marks in empty squares. The first player to get 3 of the marks in a row (up, down, across, or diagonally) is the winner. When all 9 squares are full, the game is over. If no player has 3 marks in a row, the game ends in a tie.",
    },
    {
      title: "Play with AI",
      img: ticTacToeCard,
      content:
        "This is Simple Tic Tac Toe but your opponent is AI.Try not to lose ;-)",
      Link:'AI',
      rules:
        "Players or Computer take turns putting their marks in empty squares. The first player to get 3 of the marks in a row (up, down, across, or diagonally) is the winner. When all 9 squares are full, the game is over. If no player has 3 marks in a row, the game ends in a tie.",
    },
  ];
  return (
    <>
      <Navbar />
      <div className="flex justify-center mt-20">
        <div className="grid gap-3 mt-20 lg:grid-cols-2 md:grid-cols-1 ">
          {posts.map((items, key) => (
            <>
              <div
                className="w-full rounded-lg shadow-md lg:max-w-sm mr-10"
                key={key}
              >
                <img
                  className="object-cover w-full h-72"
                  src={items.img}
                  alt="images"
                />
                <div className="p-4 bg-gray-200 ">
                  <h4 className="text-xl font-semibold text-blue-600">
                    {items.title}
                  </h4>
                  <p className="mb-2 leading-normal">{items.content}</p>
                  <Link to={items.Link}>
                  <a
                    class="inline text-white bg-indigo-600 hover:bg-indigo-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-500 dark:focus:ring-blue-800"
                    type="button"
                  >
                    Play
                  </a></Link>
                  <button
                    onClick={() => setShowModal(true)}
                    class="inline ml-4 text-white bg-indigo-600 hover:bg-indigo-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-500 dark:focus:ring-blue-800"
                    type="button"
                  >
                    Rules
                  </button>
                </div>

                {/* </Link> */}
              </div>
              {showModal ? (
                <>
                  <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                          <h3 className="text-3xl font-semibold">Rules</h3>
                          <button
                            className="p-1 ml-auto bg-white border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={() => setShowModal(false)}
                          >
                            <span className="bg-white text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                              x
                            </span>
                          </button>
                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex-auto">
                          <p className="my-4 text-slate-500 text-lg leading-relaxed">
                            {items.rules}
                          </p>
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                          <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setShowModal(false)}
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
              ) : null}
            </>
          ))}
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </>
  );
}
