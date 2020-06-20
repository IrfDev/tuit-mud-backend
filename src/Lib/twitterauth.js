require('dotenv').config()

const Twitter = require('twitter')
var client = (token, secret) => new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: token,
    access_token_secret: secret
});

module.exports = client