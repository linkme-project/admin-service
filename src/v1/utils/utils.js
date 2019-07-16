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
  },
  // Convert mongoose update or delete result to RESULT_CODE
  getResultCodeByMongooseResult (result) {
    if (result.ok == 1 && result.n == 1) return RESULT_CODE.SUCCESS;
    else if (result.ok == 1 && result.n == 0) return RESULT_CODE.DATA_EMPTY;
    else return RESULT_CODE.FAIL;
  }
};