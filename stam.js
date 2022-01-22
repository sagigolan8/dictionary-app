// const csv = require('csvtojson')
// const fs = require('fs')

// async function getWords(csvFilePath) {
//     let jsonArray = await csv().fromFile(csvFilePath);
//     jsonArray = jsonArray.map((word)=>{
//         return word
//     })
//     return jsonArray
// }


// //String.fromCharCode(e.keyCode)
// const func = async (letter) =>{
//     let filesLength = 0
//     const files = await getWords(`./assets/${letter}.csv`)
//     console.log(files.length);
//     return files.length
// }

// // func()

// //charCodeAt(0)
// const funcs =async () =>{
//     let file_length = 0
//     for (let i = 65; i <= 90; i++) {
//         file_length += await func(String.fromCharCode(i))
//     }
//     console.log(file_length);
// }
// funcs()


let sentence = 'A univalve mollusk of the genus Halitosis.'
console.log(sentence.split(' '));
