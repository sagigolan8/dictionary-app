const express = require('express');
const app = express();
const cors = require('cors');
const port = 8080

//Body parser
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Default render
app.get('/', async (req, res) => {
    res.send('hello');
})

app.listen(port, async (req, res) => {
    console.log(`Listening on port http://localhost:${port}:`);
})
