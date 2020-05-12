const userResolver = require('./user.resolver')
const textAnalyticsResolver = require('./textAnalytics.resolver')

module.exports = {
  ...textAnalyticsResolver,
  ...userResolver,
};