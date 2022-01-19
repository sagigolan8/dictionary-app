const csv = require('csvtojson')
const fs = require('fs')
const {nanoid} = require('nanoid')
const { addOrUpdateWord } = require('./server/dynamo');

async function getWords(csvFilePath) {
    let jsonArray = await csv().fromFile(csvFilePath);
    jsonArray = jsonArray.map((word)=>{
        word.partOfSpeech = getPartOfSpeech(word.word)
        word.definition = getDefinition(word.word)
        word.word = getWord(word.word)
        return word
    })
    return jsonArray
}

// getWords()

const getPartOfSpeech = (word)=>{
    let counter = 0 
    let counter2 = 0 
    for (let i = 0; i < word.length; i++) {
        if(word.charAt(i) ==="("){
            counter++
            if(counter === 1)
        word = word.slice(i+1)
        }
    }
    for (let i = 0; i < word.length; i++) {
        if(word.charAt(i) === ")")
        counter2++
            if(counter2 === 1)
        word = word.slice(0,i)
    }
    if(!word)
    word = "none"
    return word
}

const getDefinition = (word)=>{
    let counter = 0 
    for (let i = 0; i < word.length; i++) {
        if(word.charAt(i) ===")"){
        counter++
        if(counter === 1)
        word = word.slice(i+2)
        }
    }
    return word
}

const getWord = (word)=>{
    for (let i = 0; i < word.length; i++) {
        if(word.charAt(i) ===" "){
        word = word.slice(0,i)
    }
    }
    return word
}

async function getAll() {
    const files = fs.readdirSync('./assets')
    await files.forEach(async(file,i)=>{ 
        try {
            file =  await getWords(`./assets/${file}`)
            const newFile = file.map(async(word)=>{ addOrUpdateWord({ ...word, id: nanoid() })})
            await Promise.all(newFile);
            return file 
               
        } catch (error) {
            console.log(error,i);
        }
})
console.log('done');
}
getAll()