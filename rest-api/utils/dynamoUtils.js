const uuid = require("uuid");
const AWS = require("aws-sdk");
const responseUtils = require("./responseUtils");

AWS.config.update({ region: process.env.REGION });
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const jokesTable = process.env.JOKES_TABLE;

module.exports.createJoke = function(event, callback) {
  const requestBody = JSON.parse(event.body);
  const params = {
    TableName: jokesTable,
    Item: {
      id: uuid.v1(),
      jokeBody: requestBody.jokeBody,
      author: requestBody.author,
      createdAt: new Date().getTime()
    }
  };

  dynamoDb.put(params, (err, data) => {
    if (err) {
      callback(null, responseUtils.failure({ err, data }));
      return;
    }

    // Successful
    callback(null, responseUtils.success(params.Item));
  });
};

module.exports.listJokes = function(event, callback) {
  const params = {
    TableName: jokesTable
  };

  dynamoDb.scan(params, (err, data) => {
    if (err) {
      callback(null, responseUtils.failure({ err, data }));
      return;
    }

    // Successful
    callback(null, responseUtils.success(data));
  });
};

module.exports.getJoke = function(event, callback) {
  const params = {
    TableName: jokesTable,
    Key: {
      id: event.pathParameters.id
    }
  };

  dynamoDb.get(params, (err, result) => {
    if (err) {
      callback(null, responseUtils.failure({ err, result }));
      return;
    }

    // Successful
    callback(null, responseUtils.success(result.Item));
  });
};

module.exports.updateJoke = function(event, callback) {
  const requestBody = JSON.parse(event.body);

  const params = {
    TableName: jokesTable,
    Key: {
      id: event.pathParameters.id
    },
    ExpressionAttributeValues: {
      ":jokeBody": requestBody.jokeBody,
      ":author": requestBody.author,
      ":updatedAt": new Date().getTime()
    },
    UpdateExpression:
      "SET jokeBody = :jokeBody, author = :author, updatedAt = :updatedAt",
    ReturnVAlues: "ALL_NEW"
  };

  dynamoDb.update(params, (err, result) => {
    if (err) {
      callback(null, responseUtils.failure({ err, result }));
      return;
    }

    // Successful
    callback(null, responseUtils.success(result.Attributes));
  });
};

module.exports.deleteJoke = function(event, callback) {
  const params = {
    TableName: jokesTable,
    Key: {
      id: event.pathParameters.id
    }
  };

  dynamoDb.delete(params, (err, result) => {
    if (err) {
      callback(null, responseUtils.failure({ err, result }));
      return;
    }

    // Successful
    callback(null, responseUtils.success());
  });
};
