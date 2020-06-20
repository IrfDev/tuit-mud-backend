const User = require('../Models/User');

function create({
    gender,
    textAnalytics,
    locations, 
    twitterId
}) {
    const newUserObject = new User({
        gender,
        textAnalytics,
        locations,twitterId
    });
    return newUserObject.save();
};

function findByTwitterId(twitterId) {
    return User.findOne({twitterId})
};

function update(twitterId, {textAnalytics}) {
    return User.updateOne(
        {twitterId},
        {$addToSet: {textAnalytics}})
    // findOneAndUpdate(twitterId,textAnalytics, (res)=>console.log(res))
};

function getAll() {
    return User.find()
}

module.exports = {
    getAll,
    create,
    update,
    findByTwitterId
}