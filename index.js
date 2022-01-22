const csv = require('csvtojson')
const fs = require('fs')
const { nanoid } = require('nanoid')
const { addOrUpdateWord } = require('./server/dynamo');

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

// getWords()   


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

const getWord = (word) => {
    for (let i = 0; i < word.length; i++) {
        if (word.charAt(i) === " ") {
            word = word.slice(0, i)
        }
    }
    return word
}

async function getAll() {
    const files = fs.readdirSync('./assets')
    files.forEach(async (file, i) => {
        try {
            file = await getWords(`./assets/${file}`)
            const newFile = await file.map(async (word) => { addOrUpdateWord({ ...word, id: nanoid() }) })
            console.log(i);
            await Promise.all(newFile);
            return file

        } catch (error) {
            console.log(error, i);
        }
    })
    console.log('done');
}
// getAll()

const getLetter = async (letterCode) => {
    file = await getWords(`./assets/${String.fromCharCode(letterCode)}.csv`)
    console.log(file.length);
    for (let i = 0, j = 25; i < file.length; i += 25, j += 25) {
        if (j > file.length - 1)
            j = file.length - 1
        await addOrUpdateWord(file.slice(i, j))
    }
}
const getAllLetters = async () => {
    for (let i = 65; i < 91; i++)
        await getLetter(i)
}

getAllLetters()