const TextAnalytics = require('../Models/TextAnalytics');

function create({
    type,
    entities,
    sentiments,
    keywords,
    user
}) {
    const newTextAnalytics = new TextAnalytics({
        type,
        entities,
        sentiments,
        keywords,
        user,
    });
    return newTextAnalytics.save();
};

function getAll() {
    return TextAnalytics.find();
};

module.exports = {
    getAll,
    create
}