import React from 'react';
import { nanoid } from 'nanoid';
import Words from './Words';

export default function Definition({renderDefinitions,wordsDefinitions}) {
  const extractWords = () => {
    
  }

  const convertPartToWord = (part) => {
    switch (part) {
      case 'n.':
        return 'Noun'
      case 'p.':
        return 'Pronoun'
      case 'v.':
        return 'Verb'
      case 'a.':
        return 'Adjective'
      case 'adv.':
        return 'Adverb'
      case 'pr.':
        return 'Preposition'
      case 'pl.':
        return 'Plural'
      case 'interj.':
        return 'Interjection'
      default:
        return 'None Or Mixed Part-Of-Speech';
    }
  }
  return(
   <div>
       {wordsDefinitions.map(({definition, partOfSpeech ,word }) => ( // [word:'sddfs, definfitoin:''id, partofspeech:'n.'] 
          <>
          <div key={nanoid()}><b>{word}</b></div>
          <div key={nanoid()}><b>Part-Of-Speech:&nbsp;</b>{convertPartToWord(partOfSpeech)}</div>
          <div key={nanoid()}><b>Definition:</b>
             <span> 
            <Words renderDefinitions={renderDefinitions} words={definition.split(' ')}/>
            </span>
            </div>
          </>
        ) )}
   </div>
  )
}
