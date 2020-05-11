const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
    version: '2019-07-12',
    authenticator: new IamAuthenticator({
        apikey: process.env.IBM_API_KEY,
    }),
    url: process.env.IBM_URL_KEY,
});

module.exports = naturalLanguageUnderstanding