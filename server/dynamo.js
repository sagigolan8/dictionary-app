const AWS = require('aws-sdk');
require('dotenv').config();


console.log(process.env.AWS_DEFAULT_REGION);

AWS.config.update({
    region: "us-east-2",
    accessKeyId: "AKIA5RYPHNDP3DF6GEM6",
    secretAccessKey: "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",
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'dictionary';
const getWords = async () => {
    const params = {
        TableName: TABLE_NAME,
    };
    const words = await dynamoClient.scan(params).promise();
    return words;
};

const getWordById = async (id) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            id,
        },
    };
    return await dynamoClient.get(params).promise();
};

const addOrUpdateWord = async (word) => {
    try {
        const params = {
            TableName: TABLE_NAME,
            Item: word,
        };
        return await dynamoClient.put(params).promise();
    } catch (error) {
        console.log(error);
    }

};

let word = {
    id: '0',
    word: 'apple',
    definition: 'food',
    partOfSpeech : 'n.'
}

addOrUpdateWord(word)

const deleteWord = async (id) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            id,
        },
    };
    return await dynamoClient.delete(params).promise();
};

module.exports = {
    dynamoClient,
    getWords,
    getWordById,
    addOrUpdateWord,
    deleteWord,
};