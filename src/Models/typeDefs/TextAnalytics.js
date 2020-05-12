const { gql } = require('apollo-server-express');

module.exports = gql`
type TextAnalytics {
id: ID!
categories: [Category!]
entities: [Entity!]
sentiments:[Sentiment!]
keywords: [Keyword!]
concepts: [Concept!]
}

extend type Query {
textAnalytics: [TextAnalytics!]
}

extend type Mutation {
createTextAnalytics(input: createTextAnalyticsInput): TextAnalytics
}

type Concept {
text: String
relevance: Float
}

type Keyword {
text: String!
Sentiment: Sentiment!
relevance: Float
count: Int
}

type Category {
score: Float!
label: String!
}

type Entity {
type: String!
text: String!
Sentiment: Sentiment!
}

type Sentiment {
score: Float!
label: String!
}

input ConceptInput {
text: String
relevance: Float
}

input KeywordInput {
text: String!
Sentiment: SentimentInput!
relevance: Float
count: Int
}

input CategoryInput {
score: Float!
label: String!
}

input EntityInput {
type: String!
text: String!
Sentiment: SentimentInput!
}

input SentimentInput {
score: Float!
label: String!
}

input createTextAnalyticsInput {
id: ID!
categories: [CategoryInput!]
entities: [EntityInput!]
sentiments:[SentimentInput!]
keywords: [KeywordInput!]
concepts: [ConceptInput!]
}

input TextAnalyticsInput {
id: ID!
categories: [CategoryInput!]
entities: [EntityInput!]
sentiments:[SentimentInput!]
keywords: [KeywordInput!]
concepts: [ConceptInput!]
}
`;