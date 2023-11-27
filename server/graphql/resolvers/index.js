const usersResolvers = require('./users');
const categoriesResolvers = require('./categories');
const notesResolvers = require('./notes');
module.exports = {
  Query: {
    ...usersResolvers.Query,
    ...categoriesResolvers.Query,
    ...notesResolvers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...categoriesResolvers.Mutation,
    ...notesResolvers.Mutation
  }
}