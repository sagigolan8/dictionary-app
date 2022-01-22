import React from 'react';
import { nanoid } from 'nanoid';
import Words from './Words';

export default function Definition({wordsDefinitions}) {
  const extractWords = () =>{
    
  }
  return(
   <div>
       {wordsDefinitions.map(({definition, partOfSpeech ,word })=>(// [word:'sddfs, definfitoin:''id, partofspeech] 
          <>
          <div key={nanoid()}>word: {word} part of speech: {partOfSpeech}</div>
          <div key={nanoid()}>
            definition: 
            <Words definition={definition}/>
            </div>
          </>
        ) )}
   </div>
  )
}
