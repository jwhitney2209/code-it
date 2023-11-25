const typeDefs  = `#graphql 
  type User {
    _id: ID!
    username: String
    email: String
    password: String
    categories: [Category]
    notes: [Note]
  }

  type Category {
    _id: ID!
    categoryName: String
    username: String
    notes: [Note]
  }

  type Note {
    _id: ID!
    noteTitle: String
    noteText: String
    noteSnippet: String
    tag: String
    categoryId: String
    createdAt: String
    userId: String
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    me: User
    users: [User]
    user(userId: String!): User
    categories: [Category]
    notes: [Note]
    category(categoryId: String!): Category
    note(noteId: String!): Note
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload
    addUser(username: String!, email: String!, password: String!): AuthPayload
    addCategory(categoryName: String!): Category
    addNote(
      tag: String!
      noteTitle: String!
      noteText: String!
      noteSnippet: String
    ): Note
    removeNote(_id: ID!): Note
  }
`;


module.exports = typeDefs;
