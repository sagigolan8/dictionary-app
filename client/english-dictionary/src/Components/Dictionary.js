import React,{ useRef, useState } from "react";
import '../styles/index.scss'
import {
  getDefinition,
  getDefinitionsByPart,
  getDefinitionsByEnumPart
}
from '../Services/requests'
import { TextField, Box, Button } from "@material-ui/core";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Typography } from '@mui/material';
import Definition from "./Definition.js";
import Select from 'react-select'
import Instructions from "./Instructions";
import CircularProgress from '@mui/material/CircularProgress';
import { niceAlert } from "../Features/NiceAlerts.js";


const options = [  //select part of speech options
  { value: 'n.', label: 'Noun' },
  { value: 'p.', label: 'Pronoun' },
  { value: 'v.', label: 'Verb' },
  { value: 'a.', label: 'Adjective' },
  { value: 'adv.', label: 'Adverb' },
  { value: 'pl.', label: 'Plural' },
  { value: 'interj.', label: 'Interjection' },
  { value: 'none', label: 'None' },
]

export default function Dictionary() {
  const inputEl = useRef(); // input element
  const [loaderVisibility, setLoaderVisibility] = useState('none'); 
  const [currentWord, setCurrentWord] = useState();
  const [selectedPart, setSelectedPart] = useState();
  const [wordsDefinitions, setWordsDefinitions] = useState([]);

  
  const capitalize = (word) =>{
    if(word !== 'string')
    String(word)
    return `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}`
  }

  const renderSomething = () =>{
    inputEl.current.value = ''
    setCurrentWord('')
    if(!currentWord && (!selectedPart || selectedPart === 'none')){
      return niceAlert('Word doesn\'t exist in dictionary')
    }
    if(currentWord && (!selectedPart || selectedPart === 'none'))
    renderDefinitions(currentWord)
    else if(currentWord && (selectedPart !== 'none' || selectedPart))
    renderDefinitionsByPart(currentWord,selectedPart)
    if(!currentWord && selectedPart && selectedPart !== 'none')
    renderDefinitionsByEnumPart()
  }
  
  const renderDefinitions = async (word = currentWord) =>{  // -- GET /:word
    setLoaderVisibility('')
    const definitionArray = await getDefinition(word)
    setWordsDefinitions(definitionArray)
    setLoaderVisibility('none')
  }
  const renderDefinitionsByPart = async () =>{  // -- GET /:word/:partOfSpeech   
    setLoaderVisibility('')
    const definitionArray = await getDefinitionsByPart(capitalize(currentWord),selectedPart)
    setWordsDefinitions(definitionArray)
    setLoaderVisibility('none')
  }
  
  const renderDefinitionsByEnumPart = async () =>{  // -- GET /part-of-speech/:part
    setLoaderVisibility('')
    const definitionArray = await getDefinitionsByEnumPart(selectedPart)
    setWordsDefinitions(definitionArray)
    setLoaderVisibility('none')
  }

  const changePart = obj =>{
    setSelectedPart(obj.value)
  }
    return (
      <div>
      <br/>
      <br/>
      <br/>
      <Instructions/>
      <Box
      style={{textAlign: 'center'}}
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
            onChange={()=>{
              setCurrentWord(capitalize(inputEl.current.value)) 
            }}
            style={{ width: "200px", margin: "5px" }}
            type="text"
            label="word"
            variant="outlined"
            inputRef = {inputEl}
            onKeyPress={
              (e)=>{
                if(e.key === "Enter")
                return renderSomething()
              }
            }
            />
          <Select
          value = {options.find((value) => value === selectedPart)}
          onChange={changePart}
          placeholder="Part Of Speech"
          options={options} 
            />
        </div>
          <br/>
          <CircularProgress disableShrink style={{ display: loaderVisibility }} />
          <br/>
        <Button
        startIcon={<MenuBookIcon/>}
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
        wordsDefinitions={wordsDefinitions}
        />
      </div>
       <br/>
    </div>
    </Box>
    </div>
  )
  }