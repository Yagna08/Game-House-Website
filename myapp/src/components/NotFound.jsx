import React from "react";

const NotFound = () => {
  const board = Array(9).fill(null);
  board[3] = 4;
  board[4] = 0;
  board[5] = 4;
  return (
    <>
      <div className="h-screen flex">
        <div className="m-auto">
          <div className="grid grid-cols-3">
            {board.map((value, index) => (
              <div
                key={index}
                className="w-full h-[5.2rem] border border-gray-400 flex items-center justify-center text-xl font-bold"
              >
                {value}
              </div>
            ))}
          </div>
        </div>
        <br />
        <div className="my-auto lg:mr-72 font-bold text-2xl">
        <div>Sorry, it looks like that page doesn't exist!</div>
      </div>
      </div>
      
    </>
  );
};

export default NotFound;
