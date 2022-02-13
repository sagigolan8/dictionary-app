require('dotenv').config();
const AWS = require('aws-sdk');

AWS.config.update({
    region: "us-east-2", 
    accessKeyId: "AKIA5RYPHNDP3DF6GEM6",    
    secretAccessKey: "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",
    apiVersion:'2012-08-10' 
});

const dynamoClient = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'Dictionary';


/////////////////////////////////-- Cars DB --////////////////////////////////////////////////////////////////

const addOrUpdateCar = async (car) => {
    const params = {
        TableName: 'Cars',
        Item: car,
    };
    return await docClient.put(params).promise();
};

const getCarById = async (vehicleId) => {
    const params = {
        TableName: 'Cars',
        Key: {
            vehicleId,
        },
    };
    return await docClient.get(params).promise();
};

/////////////////////////////////-- Cars DB --////////////////////////////////////////////////////////////////


const addOrUpdateWord = async (words) => {
    const params = {
        RequestItems: {
            Dictionary: words.map(({ id, word, partOfSpeech, definition }) => {
                return {
                    PutRequest: {
                        Item: {
                            id: {
                                S: id
                            },
                            word: {
                                S: word
                            },
                            partOfSpeech: {
                                S: partOfSpeech
                            },
                            definition: {
                                S: definition
                            }
                        }
                    }
                }
            })
        }
    };
    try {
        console.log(params);
        await dynamoClient.batchWriteItem(params).promise();
    } catch (error) {
        console.log('error in index :');
        setTimeout(async () => {
            await dynamoClient.batchWriteItem(params).promise();
        }, 3000);
        console.log('trying again');
    }
};

const getWord = async (word) => {
    const params = {
        TableName: TABLE_NAME,
        IndexName: 'word-index',
        KeyConditionExpression: 'word = :w',
        ExpressionAttributeValues: { ':w': word }
    };
    return await docClient.query(params).promise();
};

const getWordByPart = async (word) => {
    const params = {
        TableName: TABLE_NAME,
        IndexName: 'word-index',
        KeyConditionExpression: 'word = :w',
        ExpressionAttributeValues: { ':w': word}
    };
    return await docClient.query(params).promise();
};
const getRandomWordByPart = async (partOfSpeech) => {
    const params = {
        TableName: TABLE_NAME,
        IndexName: 'partOfSpeech-index',
        KeyConditionExpression: 'partOfSpeech = :p',
        ExpressionAttributeValues: { ':p': partOfSpeech }
    };
    const { Items } = await docClient.query(params).promise();
    return [Items[Math.floor(Math.random() * Items.length)]]
};
module.exports = {
    dynamoClient,
    addOrUpdateWord,
    getWord,
    getWordByPart,
    getRandomWordByPart,
    addOrUpdateCar,
    getCarById
};