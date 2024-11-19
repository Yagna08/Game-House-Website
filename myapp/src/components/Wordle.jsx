import React,{useState,useEffect} from 'react'
import WORDS from './words.json'
import { observer, useLocalObservable } from 'mobx-react-lite'
import Guess from './Guess'
const word = WORDS[Math.floor(Math.random() * WORDS.length)]

const Wordle = () => {
     const handleKeyUp = (event) => {
        console.log(event.key)
        if (guesses < 6 && guessedWord[guesses].length === 5 && event.key === 'Enter') {
            guesses += 1
            console.log('enter')
        }
        else if (event.key === 'Backspace') {
            if (guessedWord[guesses].length >= 1) {
                guessedWord[guesses] = guessedWord[guesses].slice(0, -1);
            }
            console.log('backspace')
        }
        else if (event.key.length === 1 && /[a-zA-Z]/.test(event.key)) {
            if (guessedWord[guesses].length < 5) {
                guessedWord[guesses] += event.key.toLowerCase();
            }
        }
        console.log(guessedWord)
    }
    let guesses = 0;
    let guess = '';
    let guessedWord = (Array(6).fill(''));
    useEffect(() => {
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keyup', handleKeyUp);
        }
    }, [])
    

    console.log(word,guessedWord)
    return (
        <div className='h-screen w-screen flex flex-col justify-center items-center bg-BLACK' >
            <h1 className='text-6xl mb-10 font-bold text-white'>WORDLE</h1>
            {
                guessedWord.map((val, i) => {
                    { console.log(guessedWord[i]) }
                    return (
                        <Guess
                            word={word}
                            guess={guessedWord[i]}
                        />
                    )
                }
                )}
        </div>
    )
}

export default Wordle
