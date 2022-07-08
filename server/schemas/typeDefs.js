const { gql } = require('apollo-server-express');

// User has _id, username, email, password, has many notes and has many categories
// Note has _id, title, body, snippet, belongs to user, belongs to category
// Category has _id, name, has many notes

const typeDefs = gql`
  type User {
    _id: ID!
    username: String
    email: String
    password: String
    notes: [Note]
    categories: [Category]
  }

  type Note {
    _id: ID!
    title: String
    body: String
    snippet: String
    username: String
    category: String
  }

  type Category {
    _id: ID!
    name: String
    notes: [Note]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
  me: User
  users: [User]
  note(_id: ID!): Note
  notes: [Note]
  categories: [Category]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addCategory(name: String!): Category
  }
`;

module.exports = typeDefs;

// addCategory(name: String!, userId: String!): User
// addNote(title: String!, text: String!, snippet: String): Note
// editNote(title: String!, text: String!, snippet: String): Note