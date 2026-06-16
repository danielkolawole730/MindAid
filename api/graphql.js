const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const { typeDefs, resolvers } = require('../server/schemas');
const { authMiddleware } = require('../server/utils/auth');
require('../server/config/connection');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let apolloServerPromise;

const getApolloServer = async () => {
  if (!apolloServerPromise) {
    apolloServerPromise = (async () => {
      const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: authMiddleware,
      });

      await server.start();
      server.applyMiddleware({ app, path: '/graphql' });
      return server;
    })();
  }

  return apolloServerPromise;
};

module.exports = async (req, res) => {
  await getApolloServer();
  return app(req, res);
};
