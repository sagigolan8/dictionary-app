const express = require('express')
const app = express();
const cors = require('cors');
const port = 8080
const { getWord, getWordByPart, getRandomWordByPart } = require('./dynamo')

//Body parser
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//Default render
app.get('/part-of-speech/:part', async (req, res) => {
    const { part } = req.params
    const response = await getRandomWordByPart(part);
    response ? res.send([response]) : res.send([])
})
app.get('/:word', async (req, res) => {
    const { word } = req.params
    const response = await getWord(word);
    (response.Count !== 0) ? res.send(response.Items) : res.send([])
})

app.get('/:word/:partOfSpeech', async (req, res) => {
    const { word, partOfSpeech } = req.params
    let { Items, Count } = await getWordByPart(word);
    if(Count === 0 || Items === [])  
    return res.send([])
    else{
    Items = Items.filter((word) => word.partOfSpeech === partOfSpeech )
    res.send(Items)
    }
})


app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}:`);
})