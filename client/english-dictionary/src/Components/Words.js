import React from 'react';
import { nanoid } from 'nanoid'
export default function Words({renderDefinitions,words}) { //[ 'A', 'univalve', 'mollusk', 'of' ]
  return(
   <div>
      {words.map((word)=><><span
      style={{cursor:'pointer',color:'#0645ad',textDecoration:'underline'}}
      key={nanoid()}
      onClick={()=>renderDefinitions(word)}
      >
      {word}</span>&nbsp;&nbsp;</>)}
  </div>
  )
}
