const TextAnalytics = require('../Models/TextAnalytics');

function create({
    type,
    entities,
    sentiment,
    categories,
    keywords,
    concepts,
    user
}) {
    const newTextAnalytics = new TextAnalytics({
        type,
        entities,
        sentiments: sentiment.document,
        concepts,
        keywords,
        categories,
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