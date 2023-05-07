import React, { useState, useEffect } from "react";
import { format } from "date-fns";

import words from "./words";

import styles from "./WordWheel.module.css";

let tan = 0.41; // Math.tan(Math.PI/8 items in outer circle)

const fetchWord = () => {};

const shuffleLetters = (word) => {
  const shuffledWord = [...word];
  for (let i = shuffledWord.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledWord[i], shuffledWord[j]] = [shuffledWord[j], shuffledWord[i]];
  }
  return shuffledWord;
};

const renderLetters = (word) =>
  word.map((letter, index) => (
    <a
      className={styles.wheelContainerLink}
      key={index}
      style={{ "--i": index + 1 }}
    >
      <div>{letter}</div>
    </a>
  ));

const renderClues = (clues) => {
  return clues.map((letter, id) => (
    <h2 className="inline px-2" key={id}>
      {letter}
    </h2>
  ));
};

const WordWheel = () => {
  const [word, setWord] = useState([]);
  const [shuffledWord, setShuffledWord] = useState([]);
  const [centerLetter, setCenterLetter] = useState("a");
  const [clues, setClues] = useState([
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
  ]);

  useEffect(() => {
    const today = format(new Date(), "yyyy-MM-dd");
    const word = words[today];
    setWord(word);

    const shuffledWord = shuffleLetters(word);

    const firstLetter = shuffledWord.pop();
    setCenterLetter(firstLetter);

    setShuffledWord(shuffledWord);
  }, []);

  const onHintClick = () => {
    const randIndex = Math.floor(Math.random() * 9);

    if (clues[randIndex] != "_") {
      onHintClick();
      return;
    }

    const revealedLetter = word[randIndex];
    const updatedClues = [...clues];
    updatedClues[randIndex] = revealedLetter;

    setClues(updatedClues);
  };

  const getContent = () => {
    if (word.length > 0) {
      return (
        <>
          <div
            className={styles.wheelContainer}
            style={{ "--m": 8, "--tan": tan }}
          >
            <a className={styles.wheelContainerLink}>
              <div className="w-full">{centerLetter}</div>
            </a>
            {renderLetters(shuffledWord)}
          </div>
          <div className="text-center text-xl">{renderClues(clues)}</div>
          <div className="pt-4">
            <button
              className="mt-4 rounded-full bg-blue-100 px-4"
              onClick={() => onHintClick()}
            >
              Hint
            </button>
          </div>
        </>
      );
    }

    return <h1>{`I don't have a word yet. Check back later.`}</h1>;
  };

  return (
    <div className="my-2 flex flex-col content-center items-center">
      {getContent()}
    </div>
  );
};

export default WordWheel;
