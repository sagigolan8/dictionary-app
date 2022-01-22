import axios from 'axios'
const baseUrl = 'http://localhost:8080'

const getDefinition = async (word) =>{
    try{
        const definitionsArray = await axios.get(`${baseUrl}/${word}`); //except to get the words objects
        return definitionsArray.data                           //send only definitions
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

/////////// not works
module.exports = {
    getDefinition,
    getDefinitionsByPart
}