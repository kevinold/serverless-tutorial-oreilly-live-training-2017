const AWS = require('aws-sdk');

AWS.config.setPromisesDependency(Promise);

const jokeAuthorsTable = new AWS.DynamoDB.DocumentClient({
	params: { TableName: process.env.JOKE_AUTHORS_TABLE }
});

const jokesTable = new AWS.DynamoDB.DocumentClient({
	params: { TableName: process.env.JOKES_TABLE }
});

function getAllJokes() {
	return jokesTable.scan({ AttributesToGet: ['id', 'body', 'author'] })
		.promise()
    .then(data => data.Items);
}

function getJokeAuthor(id) {
  return jokeAuthorsTable.get(
    {
      Key: {
        id: id
      },
      AttributesToGet: ['id', 'name']
    }
  )
    .promise()
    .then(data => data.Item);
}

module.exports = {
  getAllJokes: getAllJokes,
  getJokeAuthor: getJokeAuthor
};
