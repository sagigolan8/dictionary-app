import React from 'react';
import { nanoid } from 'nanoid'
export default function Words({renderDefinitions,words,setSelectedPart,capitalize}) { //[ 'A', 'univalve', 'mollusk', 'of' ]
  return(
   <div>
      {words.map((word)=><span key={nanoid()}><span
      style={{cursor:'pointer',color:'#0645ad',textDecoration:'underline'}}
      onClick={()=>{
        setSelectedPart('none')
        return renderDefinitions(capitalize(word.replace(/[^a-zA-Z ]/g, "")))
      }}
      >
      {word}</span>&nbsp;&nbsp;</span>)}
  </div>
  )
}
