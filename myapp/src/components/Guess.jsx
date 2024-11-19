import React from 'react'

const Guess = ({ isGuessed, guess, word }) => {
    console.log(guess)
    return (
      < div className='grid grid-cols-5 gap-2 mb-2' >
          {
              new Array(5).fill(0).map((value, idx) => {
                  const bgColor = guess[idx] === word[idx] ? 'bg-GREEN' :
                      word.includes(guess[idx]) ? 'bg-YELLOW' : 'bg-GREY'
                  return (
                      <div className={`h-16 w-16 border-gray-400 ${bgColor} font-bold uppercase flex items-center justify-center text-3xl text-white`}>
                          {guess[idx]}
                      </div>
                  )
              }
              )
          }
      </div>
  )
}

export default Guess
