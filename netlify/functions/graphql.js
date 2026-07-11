const express = require('express');
const serverless = require('serverless-http');
const { ApolloServer } = require('apollo-server-express');

const { typeDefs, resolvers } = require('../../server/schemas');
const { authMiddleware } = require('../../server/utils/auth');
require('../../server/config/connection');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let serverlessHandler;

const getHandler = async () => {
  if (!serverlessHandler) {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: authMiddleware,
    });
    await server.start();
    server.applyMiddleware({ app, path: '/.netlify/functions/graphql' });
    serverlessHandler = serverless(app);
  }
  return serverlessHandler;
};

exports.handler = async (event, context) => {
  const handler = await getHandler();
  return handler(event, context);
};