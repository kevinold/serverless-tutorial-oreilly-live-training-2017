const axios = require('axios');
const responseUtils = require('./utils/responseUtils');

const ocrSpaceApiKey = process.env.OCR_SPACE_API_KEY;
const menuUrl = process.env.MENU_URL

module.exports.checkMenu = function (event, context, callback) {
  const params = {
    apikey: ocrSpaceApiKey,
    headers: {
      apikey: ocrSpaceApiKey,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    }
  };

  axios.get(`http://api.ocr.space/parse/imageurl?apikey=${ocrSpaceApiKey}&url=${menuUrl}`, params).then((resp) => {
    if (resp.data && resp.data.ParsedResults) {
      const parsedText = resp.data.ParsedResults[0].ParsedText;
      let result = 'No';

      //console.log('parsedText: ', parsedText);
      if (parsedText.match(/steak/i) && parsedText.match(/Tacos/i)) {
        result = 'Steak Tacos Yes!!!!!';
      }
      callback(null, responseUtils.success(result));
    }
  })
	.catch((err) => {
    console.log('ERROR: ', err);
	  callback(null, responseUtils.failure(err.data));
	});
}
