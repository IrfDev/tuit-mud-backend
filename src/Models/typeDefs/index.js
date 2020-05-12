const { gql } = require('apollo-server-express');

const textAnalyticsTypeDef = require('./TextAnalytics')
const userTypeDef = require('./User')

const typeDef = gql`
  type Query {
    _: String
  }
  type Mutation {
    _: String
  }
`;

module.exports = [
  typeDef,
  textAnalyticsTypeDef,
  userTypeDef,
]