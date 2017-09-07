// handler.js

const db = require("./utils/dynamoUtils");

module.exports = {
  create: (event, context, cb) => db.createJoke(event, cb),
  list: (event, context, cb) => db.listJokes(event, cb),
  get: (event, context, cb) => db.getJoke(event, cb),
  update: (event, context, cb) => db.updateJoke(event, cb),
  delete: (event, context, cb) => db.deleteJoke(event, cb)
};
