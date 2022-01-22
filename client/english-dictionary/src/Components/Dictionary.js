import React,{ useEffect, useRef, useState } from "react";
import { TextField, Box, Button } from "@material-ui/core";
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import { Typography } from '@mui/material';
import { niceAlert } from "../Features/NiceAlerts.js";
import Definition from "./Definition.js";
import Select from 'react-select'
import axios from 'axios'
const baseUrl = 'http://localhost:8080'

// import {     NOT WORKS
//   getDefinitions,
//   getDefinitionsByPart,
// }
// from '../Services/requests'

const getDefinition = async (word) =>{
  try{
      const definitionsArray = await axios.get(`${baseUrl}/${word}`); //except to get the words objects
      return definitionsArray.data                           //send all object
    } catch (err) {
      console.error(err);
    }
}

const getDefinitionsByPart = async (word,part) =>{
  try{                                                      
      const definitionsArray = await axios.get(`${baseUrl}/${word}/${part}`); //except to get the words objects
      return definitionsArray.data                           //send only definitions
    } catch (err) {
      console.error(err);
    }
}

const getDefinitionsByEnumPart = async (part) =>{
  try{
      const definitionsArray = await axios.get(`${baseUrl}/part-of-speech/${part}`); //except to get the words objects
      return definitionsArray.data                           //send only definitions
    } catch (err) {
      console.error(err);
    }
}

///////////////////////////-------  Services --------/////////////////////////////////////////////


const options = [
  { value: 'n.', label: 'Noun' },
  { value: 'p.', label: 'Pronoun' },
  { value: 'v.', label: 'Verb' },
  { value: 'a.', label: 'Adjective' },
  { value: 'adv.', label: 'Adverb' },
  { value: 'Pr', label: 'Preposition' },
  { value: 'pl.', label: 'Plural' },
  { value: 'interj', label: 'Interjection' },
  { value: 'none', label: 'None' },
]

export default function Dictionary() {
  const wordRef = useRef();
  const partRef = useRef(); // part of speech
  const [newWord, setNewWord] = useState();
  const [selectedPart, setSelectedPart] = useState();
  const [wordsDefinitions, setWordsDefinitions] = useState([{
    word:'Shakshuka',definition:'very very very very very very tasty',id:'1wqdewd3frew',partOfSpeech:'n. t.'
  }]);

  const renderSomething = () =>{
    if(newWord && (!selectedPart || selectedPart === 'none')) 
     renderDefinitions(newWord)
    else if(newWord && (selectedPart !== 'none' || selectedPart))
      renderDefinitionsByPart(newWord,selectedPart)
    if(!newWord && selectedPart && selectedPart !== 'none')
      renderDefinitionsByEnumPart()
  }

  const renderDefinitions = async (word = newWord) =>{  // -- GET /:word
    const definitionArray = getDefinition(word)
    setWordsDefinitions(definitionArray)
  }
  const renderDefinitionsByPart = async () =>{  // -- GET /:word/:partOfSpeech   
    const definitionArray = getDefinitionsByPart(newWord,selectedPart)
    setWordsDefinitions(definitionArray)
  }

  const renderDefinitionsByEnumPart = async () =>{  // -- GET /part-of-speech/:part
    const definitionArray = getDefinitionsByEnumPart(selectedPart)
    setWordsDefinitions(definitionArray)
  }

  const changePart = obj =>{
    setSelectedPart(obj.value)
  }
    return (
      <div style={{textAlign: 'center'}}>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <Box
      component="form"
      sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        >
    <div className="App" style={{textAlign:'center'}}>
      <div>
      <Typography
        variant="h6"
        color="#3f51b5"
        component="h2"
        gutterBottom
        >
        Inserted Word
        </Typography>
        <div style={{display:'inline-block'}}>
          <TextField
            onChange={()=>setNewWord(wordRef.current.value)}
            style={{ width: "200px", margin: "5px" }}
            type="text"
            label="word"
            variant="outlined"
            inputRef = {wordRef}
            />
          <Select
          value = {options.find((value) => value === selectedPart)}
          onChange={changePart}
          placeholder="Part Of Speech"
          options={options} 
          inputRef={partRef}
            />
        </div>
          <br/>
          <br/>
        <Button
        onClick={()=>renderSomething()}
        // startIcon={<SaveIcon/>} 
        variant="contained"
        color="default"
        size='large'
        >
        Search
        </Button>
        <br/>
        <br/>
        <Typography
        variant="h6"
        color="#3f51b5"
        component="h2"
        gutterBottom
        >
        Word Definition
        </Typography>
        <Definition renderDefinitions={renderDefinitions} wordsDefinitions={wordsDefinitions}/>
      </div>
       <br/>
    </div>
    </Box>
    </div>
  )
  }