import axios from 'axios'
import { niceAlert } from "../Features/NiceAlerts.js";
// const baseUrl = 'http://localhost:8080'
const baseUrl = 'https://dictionary-sagi.herokuapp.com'
const errorMessage = 'Word doesn\'t exist in dictionary'


const getDefinition = async (word) =>{
  try{                                           
      const definitionsArray = await axios.get(`${baseUrl}/${word}`); 
      if(definitionsArray.data.length === 0)
        niceAlert(errorMessage)
        return definitionsArray.data 
      } catch (err) {
      niceAlert(errorMessage)
      console.error(err);
    }
}

const getDefinitionsByPart = async (word,part) =>{
  try{                                                      
      const definitionsArray = await axios.get(`${baseUrl}/${word}/${part}`); 
      if(definitionsArray.data.length === 0)
        niceAlert(`${errorMessage} or part of speech incorrect`,2500)
      return definitionsArray.data
        } catch (err) {
        niceAlert(`${errorMessage} or part of speech incorrect`,2500)
        console.error(err);
    }
}

const getDefinitionsByEnumPart = async (part) =>{
  try{
      const definitionsArray = await axios.get(`${baseUrl}/part-of-speech/${part}`); 
      if(definitionsArray.data.length === 0)
        niceAlert(errorMessage)
      return definitionsArray.data
    } catch (err) {
      console.error(err);
    }
}

export {
  getDefinition,
  getDefinitionsByPart,
  getDefinitionsByEnumPart
}