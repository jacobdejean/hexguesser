import React, { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import UpArrow from '../public/icons/arrow-up-short.svg'
import DownArrow from '../public/icons/arrow-down-short.svg'
import LeftArrow from '../public/icons/arrow-left-short.svg'
import RightArrow from '../public/icons/arrow-right-short.svg'

export default function App() {
  const [answer, setAnswer] = useState(hexgen(24));
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(5);
  const guesses = getShuffledGuesses(answer);

  let colorBox: HTMLDivElement | null = null

  useEffect(() => {
    console.log(answer)
    colorBox && (colorBox.style.backgroundColor = `#${answer}`)
    window.onkeydown = e => keyPress(e);
  })

  function keyPress(evt: KeyboardEvent) {
    switch(evt.key) {
      case 'w':
        makeGuess(guesses[0]);
        break;
      case 'a':
        makeGuess(guesses[1]);
        break;
      case 'd':
        makeGuess(guesses[2]);
        break;
      case 's':
        makeGuess(guesses[3]);
        break;
    }
  }

  function makeGuess(guess: string) {
    if(guess === answer)
      setScore(score + 1);
    else
      setLives(lives - 1);

    if(lives < 0) {
      setLives(5);
      setScore(0);
    }
    
    setAnswer(hexgen(24));
  }

  return (
    <div className={'wrapper'}>
      <div className={'title'}>hexguesser</div>
      <div className={'title'}>Score: {score}</div>
      <div className={'title'}>Lives: {lives}</div>
      <button className={'color-container'} onClick={_ => setAnswer(hexgen(24))}>
        <div className={'color-box'} ref={e => colorBox = e}></div>
      </button>
      <div className={'guess-container'}>
        <p className={'guess-text'}>{'#' + guesses[0]}</p>
        <div className={'guess-row'}>
          <p className={'guess-button'}>W</p>
        </div>
        <div className={'guess-row'}>
          <p className={'guess-text'}>{`#${guesses[1]}`}</p>
          <p className={'guess-button'}>A</p>
          <p className={'guess-button'}>S</p>
          <p className={'guess-button'}>D</p>
          <p className={'guess-text'}>{`#${guesses[2]}`}</p>
        </div>
        <p className={'guess-text'}>{`#${guesses[3]}`}</p>
      </div>
    </div>
     
  );
}

function getShuffledGuesses(answer: string) {
  const guesses = [hexgen(24), hexgen(24), hexgen(24), hexgen(24)];

  guesses[Math.floor(Math.random() * 4)] = answer;

  return guesses;
}

function hexgen(size: number) {
  size < 1 && (size = 1);

  const [n, r] = [Math.floor(size / 4), size % 4];
  let hex = '';

  r && (hex = Math.floor(Math.random() * (1 << r)).toString(16));
  for(let i = 0; i < n; i++) {
    hex += Math.floor(Math.random() * 15).toString(16);
  }

  return hex;
}
