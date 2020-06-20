const express = require('express')
const router = express.Router()
const clientFunction = require('../Lib/twitterauth')

router.get('/', async (req, res) => {
    params = { include_rts: false, exclude_replies: true, count: 200 };
    const secret = req.user.sec
    const ref = req.user.ref
    const client = clientFunction(ref, secret);
    try {
        const userTweets = client.get('/statuses/user_timeline.json', params, (err, tweets, response) => {
            const tweetText = tweets.map((tweetObject) => tweetObject.text)
            res.json({
                success: true,
                message: 'All tweets',
                data: {
                    tweetText,
                    twitterId: req.user.user,
                },
            });
        });

    } catch (error) {
        res.json({
            success: false,
            message: 'No se consiguieron los Tweets del usuario',
            error: error
        })
    }
});

router.get('/mentions', (req, res) => {
    params = {  count: 200 };
    const client = clientFunction(req.user.ref, req.user.sec);
    try { 
        const userTweets = client.get('statuses/home_timeline', params, (err, tweets, response) => {
            const tweetText = tweets.map((tweetObject) => tweetObject.text)
            res.json({
                success: true,
                message: 'All mention tweets',
                data: {
                    tweetText,
                }
            })
        })

    } catch (error) {
        res.json({
            success: false,
            message: 'No se obtuvieron las menciones del usuario',
            error: error
        })
    }
});

router.get('/favs', (req, res) => {
    params = {  include_rts: false, exclude_replies: true, count: 200 };
    const client = clientFunction(req.user.ref, req.user.sec);
    try {
        const userTweets = client.get('favorites/list', params, (err, tweets, response) => {
        const tweetText = tweets.map((tweetObject) => tweetObject.text)
            res.json({
                success: true,
                message: 'All fav tweets',
                data: {
                    tweetText,
                }
            })
        })

    } catch (error) {
        res.json({
            success: false,
            message: 'No se obtuvieron los favs del usuario',
            error: error
        })
    }
});

router.get('/user', (req, res) => {
    params = { include_rts: false, exclude_replies: false, count: 200 }
    const client = clientFunction(req.user.ref, req.user.sec)
    try {
        const userSettings = client.get('account/settings', params, (err, settings, response) => {
            // const locations = settings.trend_location;
            res.json({
                success: true,
                message: 'All mention tweets',
                data: {
                    settings,
                    twitterId: req.user.user,
                }
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

// router.get('/favs', (req, res) => {
//     const client = clientFunction(req.user.token, req.user.tokenSecret)
//     params = { count: 200 }
//     try {
//         const userTweets = client.get('/favorites/list', params, (err, tweets, response) => {
//             const tweetText = tweets.map((tweetObject) => tweetObject.text)
//             res.json({
//                 success: true,
//                 message: 'All faved tweets of user',
//                 data: {
//                     tweetText,
//                     twitterId: req.user.user,
//                 }
//             })
//         })

//     } catch (error) {
//         res.json({
//             success: false,
//             message: 'No se obtuvieron los favs',
//             error: error
//         })
//     }
// })

module.exports = router