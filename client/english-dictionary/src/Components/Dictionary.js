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
  console.log(word);
  try{
      const definitionsArray = await axios.get(`${baseUrl}/${word}`); //except to get the words objects
      console.log(definitionsArray.data.length);
      if(definitionsArray.data.length === 0){
        niceAlert('Word doesn\'t exist in dictionary','error')
        return []
        }
        else
        return definitionsArray.data
      } catch (err) {
      niceAlert('Word doesn\'t exist in dictionary','error')
      console.error(err);
    }
}

const getDefinitionsByPart = async (word,part) =>{
  try{                                                      
      const definitionsArray = await axios.get(`${baseUrl}/${word}/${part}`); //except to get the words objects
      if(definitionsArray.data.length === 0){
        niceAlert('Word doesn\'t exist in dictionary or part of speech incorrect','error',2500)
      return [{word:'',partOfSpeech:'',id:'',definition:''}]
      }
      else
      return definitionsArray.data
        } catch (err) {
        niceAlert('Word doesn\'t exist in dictionary or part of speech incorrect','error',2500  )
        console.error(err);
    }
}

const getDefinitionsByEnumPart = async (part) =>{
  try{
      const definitionsArray = await axios.get(`${baseUrl}/part-of-speech/${part}`); //except to get the words objects
      console.log(definitionsArray.data);
      if(definitionsArray.data.length === 0){
        niceAlert('Word doesn\'t exist in dictionary','error')
        return []
        }
        else
        return definitionsArray.data
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
  const [wordsDefinitions, setWordsDefinitions] = useState([]);

  const capitalize = (word) =>{
    if(word !== 'string')
    String(word)
    return `${word.charAt(0).toUpperCase()}${word.slice(1)}`
  }

  const renderSomething = () =>{
    wordRef.current.value = ''
    setNewWord('')
    if(newWord && (!selectedPart || selectedPart === 'none'))
     renderDefinitions(capitalize(newWord))
    else if(newWord && (selectedPart !== 'none' || selectedPart))
      renderDefinitionsByPart(capitalize(newWord),selectedPart)
    if(!newWord && selectedPart && selectedPart !== 'none')
      renderDefinitionsByEnumPart()
  }

  const renderDefinitions = async (word = capitalize(newWord)) =>{  // -- GET /:word
    const definitionArray = await getDefinition(word)
    console.log(definitionArray);
    setWordsDefinitions(definitionArray)
  }
  const renderDefinitionsByPart = async () =>{  // -- GET /:word/:partOfSpeech   
    const definitionArray = await getDefinitionsByPart(capitalize(newWord),selectedPart)
    setWordsDefinitions(definitionArray)
  }

  const renderDefinitionsByEnumPart = async () =>{  // -- GET /part-of-speech/:part
    const definitionArray = await getDefinitionsByEnumPart(selectedPart)
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
            onChange={()=>setNewWord(capitalize(wordRef.current.value))}
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
        <Definition
        capitalize={capitalize}
        setSelectedPart={setSelectedPart} 
        renderDefinitions={renderDefinitions} 
        wordsDefinitions={wordsDefinitions}/>
      </div>
       <br/>
    </div>
    </Box>
    </div>
  )
  }