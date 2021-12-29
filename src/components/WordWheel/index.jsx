import React, { useState, useEffect } from "react";
import axios from 'axios';
import Seo from '@lekoarts/gatsby-theme-minimal-blog/src/components/seo';

import './WordWheel.scss'

let tan = 0.41 // Math.tan(Math.PI/8 items in outer circle)

const fetchWord = async () => {
  try {
    const { data: { word } } = await axios.get('/.netlify/functions/word_wheel-get'); 
    if (!word){
      return [];
    }
    
    return word.split('');
  } catch (err) {
    console.error(err);
  }
}

const shuffleLetters = (word) => {
  const shuffledWord = [...word];
  for (let i = shuffledWord.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledWord[i], shuffledWord[j]] = [shuffledWord[j], shuffledWord[i]];
  }
  return shuffledWord;
}

const renderLetters = (word) => (
  word.map((letter, index) => (
    <a key={index} style={{'--i': index + 1}}>
      <div>{letter}</div>
    </a>))
);

const renderClues = (clues) => {
  return clues.map((letter, id) => (<h2 key={id}>{letter}</h2>));
}

const WordWheel = () => {
  const [word, setWord] = useState([]);
  const [shuffledWord, setShuffledWord] = useState([]);
  const [centerLetter, setCenterLetter] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [clues, setClues] = useState(['_', '_', '_', '_', '_', '_', '_', '_', '_']);
  
  useEffect(async () => {
    const word = await fetchWord();
    setIsLoading(false);
    setWord(word);
    
    const shuffledWord = shuffleLetters(word)
    
    const firstLetter = shuffledWord.pop();
    setCenterLetter(firstLetter);
    
    setShuffledWord(shuffledWord);
  }, []);

  const onHintClick = () => {
    const randIndex = Math.floor(Math.random() * 9);

    if (clues[randIndex] != '_') {
      onHintClick();
      return;
    }

    const revealedLetter = word[randIndex];
    const updatedClues = [...clues];
    updatedClues[randIndex] = revealedLetter;

    setClues(updatedClues);
  }

  const getContent = () => {
    if(isLoading) {
      return (<h2>Loading a word...</h2>);
    }

    if (word.length > 0) {
      return (
        <>
          <div className='wheel-container' style={{'--m': 8, '--tan': tan}}>
            <a>
              <div>{centerLetter}</div>
            </a>
            {renderLetters(shuffledWord)}
          </div>
          <div className="clue-container">
            {renderClues(clues)}
          </div>
          <div className="hint-container">
            <button onClick={() => onHintClick()}>Hint</button>
          </div>
        </>
      )
    }

    return (<h1>I don't have a word yet. Check back later.</h1>);
  }

  return (
  <>
    <Seo title='Word Wheel' />
    <div className='page-container'>
      { getContent() }
    </div>
  </>
)};

export default WordWheel;