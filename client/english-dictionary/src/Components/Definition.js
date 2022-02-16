import React from 'react';
import { nanoid } from 'nanoid';
import Words from './Words';
import { ListGroup } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Definition({renderDefinitions,wordsDefinitions,setSelectedPart,capitalize}) {
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
        return 'none/mixed part-of-speech.';
    }
  }
  return(
   <ListGroup >                                           
       {wordsDefinitions.map(({definition, partOfSpeech ,word }) => ( 
          <ListGroup.Item key={nanoid()}>
          <br/>
          <div><b>{word}:</b> ({convertPartToWord(partOfSpeech)})</div>
          <div>                                   
            <span> 
            <Words
            capitalize={capitalize}
            renderDefinitions={renderDefinitions} 
            words={definition.split(' ')}
            setSelectedPart={setSelectedPart}
            />
            </span>
            <br/>
            </div>
          </ListGroup.Item>
        ) )}
   </ListGroup>
  )
}
