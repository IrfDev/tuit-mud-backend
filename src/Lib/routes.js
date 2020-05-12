const express = require('express')
const error = require('../Middlewares/error')
const getTweetsRouter = require('../usecases/getTweets')
const nluRouter = require('../usecases/nlu')
const TextAnalytics = require('../Router/TextAnalytics')

const userRouter = require('../Router/Users')


module.exports = function(app) {
    app.use(express.json());
    app.use('/tweets', getTweetsRouter);
    app.use('/nlu', nluRouter);
    app.use('/textAnalytics', TextAnalytics);
    app.use('/user', userRouter);
    app.use(error);
}