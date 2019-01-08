const { GraphQLServer } = require("graphql-yoga");
const { merge } = require("lodash");
const { mergeTypes } = require("merge-graphql-schemas");
const UserMutation = require("./user/Mutation");
const UserQuery = require("./user/Query");
const db = require("./db");
const authenticated = require("./middlewares/auth");
const userTypeDefs = require("./user/user.typedefs.graphql");
const authDirective = require("./directives/auth");

// Create the GraphQL Yoga Server

function createServer() {
  return new GraphQLServer({
    typeDefs: mergeTypes([userTypeDefs], { all: true }),
    resolvers: {
      Mutation: merge({}, UserMutation),
      Query: merge({}, UserQuery)
    },
    schemaDirectives: {
      auth: authDirective
    },
    resolverValidationOptions: {
      requireResolversForResolveType: false
    },
    context: req => ({ ...req, db }),
    middlewares: [authenticated]
  });
}

module.exports = createServer;
