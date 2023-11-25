module.exports = `#graphql
type User {
  id: ID!
  username: String
  email: String
  password: String
  categories: [Category]
  notes: [Note]
}

type Category {
  id: ID!
  name: String!
  notes: [Note]
}

type Note {
  id: ID!
  title: String!
  description: String
  snippet: String
  createdAt: String
  category: Category
}

type AuthPayload {
  token: String!
  user: User!
}

type Query {
  me: User
  users: [User]
}

type Mutation {
  login(email: String!, password: String!): AuthPayload
  addUser(username: String!, email: String!, password: String!, confirmPassword: String!): AuthPayload
  addCategory(name: String!): Category
  addNote(title: String!, description: String, snippet: String, categoryId: String): Note
  removeNote(noteId: String!): Note
}
`