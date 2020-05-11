const express = require('express')
const router = express.Router()
const client = require('../Lib/twitterauth')

router.get('/', (req, res) => {
    params = { include_rts: true, exclude_replies: false, count: 360 }
    try {
        const userTweets = client.get('/statuses/user_timeline.json', params, (err, tweets, response) => {
            const tweetText = tweets.map((tweetObject) => tweetObject.text)
            res.json({
                success: true,
                message: 'All tweets',
                data: {
                    text: tweetText,
                    tweets
                },
            });
        });

    } catch (error) {
        res.json({
            success: false,
            message: 'No se consiguieron los Tweets',
            error: error
        })
    }
})

router.get('/mentions', (req, res) => {
    params = { include_rts: false, exclude_replies: false, count: 200 }
    try {
        const userTweets = client.get('statuses/mentions_timeline', params, (err, tweets, response) => {
            res.json({
                success: true,
                message: 'All mention tweets',
                data: tweets
            })
        })

    } catch (error) {
        res.json({
            success: false,
            message: 'No se obtuvieron las menciones',
            error: error
        })
    }
})

router.get('/favs', (req, res) => {
    params = { count: 200 }
    try {
        const userTweets = client.get('/favorites/list', params, (err, tweets, response) => {
            res.json({
                success: true,
                message: 'All faved tweets of user',
                data: tweets
            })
        })

    } catch (error) {
        res.json({
            success: false,
            message: 'No se obtuvieron los favs',
            error: error
        })
    }
})

module.exports = router