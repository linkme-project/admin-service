const { RESULT_CODE, RESULT_MESSAGE } = require('./constants');
module.exports = {
  deleteUndefinedKeys (obj) {
    for (let prop in obj) {
      if (obj[prop] === undefined) {
        delete obj[prop];
      }
    }
    return obj;
  },
  createResponse (code, message, result) {
    return {
      resultCode: code,
      resultMessage: message,
      returnValue: result
    };
  },
  getResultMessage (resultCode) {
    for (let code in RESULT_CODE) {
      if (RESULT_CODE[code] == resultCode) {
        return RESULT_MESSAGE[code];
      }
    }
    return null;
  }
};