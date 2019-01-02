const {
    GraphQLServer
} = require("graphql-yoga");
const {
    merge
} = require("lodash");
const UserMutation = require("./user/Mutation");
const UserQuery = require("./user/Query");

// Create the GraphQL Yoga Server

function createServer() {
    return new GraphQLServer({
        typeDefs: ["src/user/schema.graphql"],
        resolvers: {
            Mutation: merge({}, UserMutation),
            Query: merge({}, UserQuery)
        },
        resolverValidationOptions: {
            requireResolversForResolveType: false
        },
        context: req => ({ ...req
        })
    });
}

module.exports = createServer;