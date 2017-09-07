const _graphql = require('graphql');
const responseUtils = require('./utils/responseUtils');
const publicSchema = require('./lib/schema');

module.exports = {
  runGraphql: (event, context, callback) => {
  const requestBody = JSON.parse(event.body);
  //console.log('Query: ', requestBody.query);
  //console.log('Variables: ', requestBody.variables);

  _graphql.graphql(publicSchema, requestBody.query, {}, null, requestBody.variables)
    .then(resp => {
      console.log('resp: ', resp);
      callback(null, responseUtils.success(resp));
    })
    .catch(err => {
      console.log('err: ', err);
      callback(null, responseUtils.failure(err));
    });
  },
  hello: (event, context, callback) => callback(null, responseUtils.success('Hello World'))
}


