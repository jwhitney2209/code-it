const { gql } = require("apollo-server-express");

// User has _id, username, email, password, has many notes and has many categories
// Note has _id, title, body, snippet, belongs to user, belongs to category
// Category has _id, name, has many notes

const typeDefs = gql`
  type User {
    _id: ID!
    username: String
    email: String
    password: String
    categories: [Category]
  }

  type Category {
    _id: ID!
    name: String
    userId: String
    notes: [Note]
  }

  type Note {
    _id: ID!
    noteTitle: String
    noteText: String
    noteSnippet: String
    categoryId: String
    createdAt: String
    userId: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    categories: [Category]
    notes(userId: ID!): [Note]
    category(_id: ID!): Category
    note(_id: ID!): Note
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addCategory(name: String!): Category
    addNote(
      categoryId: ID!
      noteTitle: String!
      noteText: String!
      noteSnippet: String
    ): Note
    removeNote(_id: ID!, categoryId: ID!): Note
  }
`;

module.exports = typeDefs;

