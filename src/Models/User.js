const mongoose = require('mongoose');

const userObject = new mongoose.Schema({
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: false
    },
    textAnalytics: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'analyticsObjects',
    }],
    locations: [{
        country: String,
        name: String,
    }],
    twitterId: String,
})

module.exports = mongoose.model('user', userObject)