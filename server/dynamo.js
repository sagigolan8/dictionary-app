const AWS = require('aws-sdk');
require('dotenv').config();


console.log(process.env.AWS_DEFAULT_REGION);

AWS.config.update({
    region: "us-east-2",
    accessKeyId: "AKIA5RYPHNDP3DF6GEM6",
    secretAccessKey: "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",
    apiVersion:'2012-08-10'
});

const dynamoClient = new AWS.DynamoDB();

// const TABLE_NAME = 'english-dictionary';
const TABLE_NAME = 'dictionary';
const getWords = async () => {
    const params = {
        TableName: TABLE_NAME,
    };
    const words = await dynamoClient.scan(params).promise();
    return words;
    // return words.length;
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

const addOrUpdateWord = async (words) => {
    const params = {
        RequestItems: {
            dictionary: words.map(({ id, word, partOfSpeech, definition }) => {
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



const deleteWord = async (id) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            id,
        },
    };
    return await dynamoClient.delete(params).promise();
};

getWords()

module.exports = {
    dynamoClient,
    getWords,
    getWordById,
    addOrUpdateWord,
    deleteWord,
};