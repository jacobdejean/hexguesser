import { ReactNode, useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [answer, setAnswer] = useState(hexgen(24));
  const [guess, setGuess] = useState("");
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(5);
  const guesses = getShuffledGuesses(answer);

  let colorBox: HTMLDivElement | null = null;

  useEffect(() => {
    window.addEventListener("keydown", keyPress);
    return () => window.removeEventListener("keydown", keyPress);
  }, []);

  function keyPress(evt: KeyboardEvent) {
    switch (evt.key) {
      case "w":
        setGuess(guesses[0]);
        break;
      case "a":
        setGuess(guesses[1]);
        break;
      case "d":
        setGuess(guesses[2]);
        break;
      case "s":
        setGuess(guesses[3]);
        break;
    }
  }

  useEffect(() => {
    if (colorBox) colorBox.style.backgroundColor = "#" + answer;
  }, [answer]);

  useEffect(() => {
    if (score > 0) console.log("Correct!");
  }, [score]);

  useEffect(() => {
    if (guess === answer) setScore(score + 1);
    else setLives(lives - 1);

    if (lives === 0) {
      setLives(5);
      setScore(0);

      console.log("Game over!");
    }

    setAnswer(hexgen(24));
  }, [guess]);

  return (
    <div className="app">
      <div className="title">
        <h2>hexguesser</h2>
        <h2>
          Score: {score} Lives: {lives}
        </h2>
      </div>

      <button
        className="color-container"
        onClick={(_) => setAnswer(hexgen(24))}
      >
        <div className="color-box" ref={(e) => (colorBox = e)}></div>
      </button>
      <div className="guess-container">
        <GuessButtons
          keys={["w", "a", "s", "d"]}
          guesses={guesses}
          onClick={setGuess}
        />
        <GuessLabels labels={guesses} />
      </div>
    </div>
  );
}

function GuessButtons({
  keys,
  guesses,
  onClick,
}: {
  keys: string[];
  guesses: string[];
  onClick: (guess: string) => void;
}) {
  return (
    <>
      {keys.map((key, index) => (
        <button
          key={`gb-${key}`}
          id={`gb-${key}`}
          className="guess"
          onClick={() => onClick(guesses[index])}
        >
          {key.toUpperCase()}
        </button>
      ))}
    </>
  );
}

function GuessLabels({ labels }: { labels: string[] }) {
  return (
    <>
      {labels.map((label, index) => (
        <p key={`gt-${index}`} id={`gt-${index}`} className="guess-text">
          #{label.toUpperCase()}
        </p>
      ))}
    </>
  );
}

function getShuffledGuesses(answer: string) {
  const guesses = Array.from({ length: 4 }).map((_) => hexgen(24));

  guesses[Math.floor(Math.random() * 4)] = answer;

  return guesses;
}

function hexgen(size: number) {
  const length = Math.floor(size / 4);

  const hex = Array.from({ length }, () => 0)
    .map((_) => {
      return Math.floor(Math.random() * 15).toString(16);
    })
    .join("");

  return hex;
}
