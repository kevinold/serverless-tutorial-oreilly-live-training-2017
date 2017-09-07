const _graphql = require('graphql');
const dynamoUtils = require('./dynamo');
const types = require('./types');

const rootQuery = new _graphql.GraphQLObjectType({
  name: "Jokes",
  description: "Jokes!!!",
  fields: {
    hello: {
      type: _graphql.GraphQLString,
      resolve () {
        return 'Hello World from GraphQL!'
      }
    },
    allJokes: {
      type: new _graphql.GraphQLList(types.Joke),
      description: "List of all Dad Jokes",
      resolve: dynamoUtils.getAllJokes
    }
  }
});

const publicSchema = new _graphql.GraphQLSchema({ query: rootQuery });

module.exports = publicSchema;
