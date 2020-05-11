const mongoose = require('mongoose')

const textAnalyticsSchema = new mongoose.Schema({
    categories: {
        type: Array,
        required: true,
    },
    entities: {
        type: Array,
        required: true
    },
    sentiments: {
        type: Array,
        required: true
    },
    keywords: {
        type: Array,
        required: true
    },
})

module.exports = mongoose.model('analyticsObjects', textAnalyticsSchema)