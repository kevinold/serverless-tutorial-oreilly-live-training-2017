module.exports.success = function(body, headers) {
  return this.buildResponse(body, headers, 200);
};

module.exports.failure = function(body, headers) {
  return this.buildResponse(body, headers, 500);
};

module.exports.buildResponse = function(body, headers, statusCode) {
  return {
    statusCode: statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    },
    body: JSON.stringify(body)
  };
};
