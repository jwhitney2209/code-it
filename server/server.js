const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require("@apollo/server/express4")
const cors = require("cors");
const path = require('path');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(cors());

  app.use("/graphql", expressMiddleware(server, {
    context: authMiddleware,
  }));

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`)
    })
  })
}

startApolloServer();

