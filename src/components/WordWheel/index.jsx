import React, { useState, useEffect } from "react";
import axios from 'axios';
import Seo from '@lekoarts/gatsby-theme-minimal-blog/src/components/seo';

import './WordWheel.scss'

let tan = 0.41 // Math.tan(Math.PI/8 items in outer circle)

const fetchWord = async () => {
  try {
    const { data: { word } } = await axios.get('/.netlify/functions/word_wheel.get'); 
    if (!word){
      return [];
    }
    
    return word.split('');
  } catch (err) {
    console.error(err);
  }
}

const shuffleLetters = (word) => {
  for (let i = word.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [word[i], word[j]] = [word[j], word[i]];
  }
}

const renderLetters = (word) => (
  word.map((letter, index) => (<a key={index} style={{'--i': index + 1}}><div>{letter}</div></a>))
)

const WordWheel = () => {
  const [word, setWord] = useState([]);
  const [centerLetter, setCenterLetter] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(async () => {
    const word = await fetchWord();
    setIsLoading(false);
    
    shuffleLetters(word)
    
    const firstLetter = word.pop();
    setCenterLetter(firstLetter);
    
    setWord(word);
  }, [])

  const getContent = () => {
    if(isLoading) {
      return (<h2>Loading a word...</h2>);
    }

    if (word.length > 0) {
      return (
        <div className='wheel-container' style={{'--m': 8, '--tan': tan}}>
          <a><div>{centerLetter}</div></a>
          {renderLetters(word)}
        </div>
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