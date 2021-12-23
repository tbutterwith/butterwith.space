import React from 'react';
import Seo from '@lekoarts/gatsby-theme-minimal-blog/src/components/seo';

import './WordWheel.scss'

let tan = 0.41 // Math.tan(Math.PI/8 items in outer circle)

const WordWheel = () => (
  <>
    <Seo title='Word Wheel' />
    <div className='page-container'>
      <div className='wheel-container' style={{'--m': 8, '--tan': tan}}>
        <a><div>I</div></a>
        <a style={{'--i': 1}}><div>A</div></a>
        <a style={{'--i': 2}}><div>B</div></a>
        <a style={{'--i': 3}}><div>C</div></a>
        <a style={{'--i': 4}}><div>D</div></a>
        <a style={{'--i': 5}}><div>E</div></a>
        <a style={{'--i': 6}}><div>F</div></a>
        <a style={{'--i': 7}}><div>G</div></a>
        <a style={{'--i': 8}}><div>H</div></a>
      </div>
    </div>
  </>
)

export default WordWheel;