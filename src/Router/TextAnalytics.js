const express = require('express');
const textAnalytics = require('../usecases/TextAnalytics');

const router = express.Router();

router.get('/', async(req, res) => {
    try {
        const allTextAnalysis = await textAnalytics.getAll()
        res.json({
            success: true,
            message: 'All textAnalytics',
            data: {
                users: allTextAnalysis,
            },
        });
    } catch (error) {
        res.json({
            success: false,
            message: 'Failed to fetch all users',
            error: error.message,
        });
    };
});


router.post('/', async(req, res) => {
    try {
        const newTextAnalyticsObject = req.body
        const newTextAnalytics = await textAnalytics.create(newTextAnalyticsObject)
        res.json({
            success: true,
            message: 'New text analytics created',
            data: {
                textAnalytics: {
                    newTextAnalytics
                }
            }
        })
    } catch (error) {
        res.json({
            success: false,
            message: 'Something went wrong while create a text analysis',
            error: error.message
        })
    }
})

module.exports = router;