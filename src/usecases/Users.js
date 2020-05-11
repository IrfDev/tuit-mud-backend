const User = require('../Models/User');

function create({
    gender,
    textAnalytics,
    locations
}) {
    const newUserObject = new User({
        gender,
        textAnalytics,
        locations
    });
    return newUserObject.save();
}

function getAll() {
    return User.find()
}

module.exports = {
    getAll,
    create
}