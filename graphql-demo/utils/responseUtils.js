function buildResponse(body, statusCode) {
  return {
    statusCode: statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(body),
  };
}

module.exports = {
  success: (body) => buildResponse(body, 200),
  failure: (body) => buildResponse(body, 500)
}
