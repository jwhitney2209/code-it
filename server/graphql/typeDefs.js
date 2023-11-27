module.exports = `#graphql
type User {
  id: ID!
  username: String
  email: String
  categories: [Category]
  notes: [Note]
}

type Category {
  id: ID!
  name: String!
  userId: String
}

type Note {
  id: ID!
  title: String
  description: String
  snippet: String
  createdAt: String
  category: Category
  userId: User
}

type AuthPayload {
  token: String!
  user: User!
}

type Query {
  me: User
  users: [User]
  categories: [Category]
  notes: [Note]
}

type Mutation {
  login(email: String!, password: String!): AuthPayload
  addUser(username: String!, email: String!, password: String!, confirmPassword: String!): AuthPayload
  addCategory(name: String!): Category
  addNote(title: String!, description: String, snippet: String, categoryId: String): Note
  removeCategory(categoryId: String!): String
  updateCategory(categoryId: String!, name: String!): Category
  removeNote(noteId: String!): String
}
`