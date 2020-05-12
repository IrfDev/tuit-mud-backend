const { gql } = require('apollo-server-express');

module.exports = gql`
extend type Query {
  users: [User!]
}

type User {
  id: ID!
  gender: String!
  textAnalytics: TextAnalytics
  locations: [Location!]
}


type Location {
  name: String!
  countryCode: String!
}

input locationInput {
  name: String!
  countryCode: String!
}

extend type Mutation {
  createUser(input:createUserInput): User
}

input createUserInput {
  id: ID!
  gender: String
  textAnalytics: TextAnalyticsInput
  locations: [locationInput]
}
`;