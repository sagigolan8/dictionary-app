import axios from 'axios'
import { niceAlert } from "../Features/NiceAlerts.js";
const baseUrl = 'http://localhost:8080'

const getDefinition = async (word) =>{
  try{
      const definitionsArray = await axios.get(`${baseUrl}/${word}`); //except to get the words objects
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

export {
  getDefinition,
  getDefinitionsByPart,
  getDefinitionsByEnumPart
}