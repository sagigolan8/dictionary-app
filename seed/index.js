const csv = require('csvtojson')
const { nanoid } = require('nanoid')
const { addOrUpdateWord } = require('../server/dynamo');

/**
 * The function gets array of words of some letter file
 * Every object in the array consist of 4 properties:
 * Example: {
 * word: "Child" ,
 * partOfSpeech: "n." ,
 * definition: "A noble youth. See Childe." ,
 * id: "V1StGXR8_Z5jdHi6B-myT"
 * } 
 */
async function getWords(csvFilePath) {  
    let jsonArray = await csv().fromFile(csvFilePath); 
    jsonArray = jsonArray.map((word) => {
        word.partOfSpeech = getPartOfSpeech(word.word)
        word.definition = getDefinition(word.word)
        word.word = getWord(word.word)
        word.id = nanoid()
        return word
    })
    return jsonArray      
}


/**
 * Extract the part of speech from the all sentence
 */
const getPartOfSpeech = (word) => { 
    let counter = 0
    let counter2 = 0
    for (let i = 0; i < word.length; i++) {
        if (word.charAt(i) === "(") {
            counter++
            if (counter === 1)
                word = word.slice(i + 1)
        }
    }
    for (let i = 0; i < word.length; i++) {
        if (word.charAt(i) === ")")
            counter2++
        if (counter2 === 1)
            word = word.slice(0, i)
    }
    if (!word)
        word = "none"
    return word
}


/**
 * Extract the definition from the all sentence
 */
const getDefinition = (word) => { 
    let counter = 0
    for (let i = 0; i < word.length; i++) {
        if (word.charAt(i) === ")") {
            counter++
            if (counter === 1)
                word = word.slice(i + 2)
        }
    }
    return word
}


/**
 * Extract the word from the all sentence
 */
const getWord = (word) => { 
    for (let i = 0; i < word.length; i++) {
        if (word.charAt(i) === " ") {
            word = word.slice(0, i)
            return word
        }
    }
    return word
}


/**
 * Seeds all the asked letter's words in dynamo db
 * We do that in chunks of 25 words in once 
 * Because this is the limit that jef bezos gave us to use for free
 */
const putLetter = async (letterCode) => { 
    const letterArray = await getWords(`./assets/${String.fromCharCode(letterCode)}.csv`)
    for (let i = 0, j = 25; i < letterArray.length; i += 25, j += 25) {
        if (j > letterArray.length - 1)
        j = letterArray.length - 1
        await addOrUpdateWord(letterArray.slice(i, j))
    }
}


/**
 * Iterate all the letters from A-Z and Seeds them in the dynamo db
 */
const putAllLetters = async () => {
    for (let i = 65; i < 91; i++)
        await putLetter(i)
}

// putAllLetters()