const _graphql = require('graphql');
const dynamoUtils = require('./dynamo');

const Author = new _graphql.GraphQLObjectType({
  name: "Author",
  description: "Author of the joke",
  fields: {
    id: { type: _graphql.GraphQLString },
    name: { type: _graphql.GraphQLString }
  }
});

const Joke = new _graphql.GraphQLObjectType({
  name: "Joke",
  description: "The Joke",
  fields: {
    id: { type: _graphql.GraphQLString },
    body: { type: _graphql.GraphQLString },
    author: {
      type: Author,
      resolve (source) {
        return dynamoUtils.getJokeAuthor(source.id);
      }
    }
  }
});

module.exports = {
  Joke: Joke,
  Author: Author
};
