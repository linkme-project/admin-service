module.exports = {
  RESULT_CODE: {
    SUCCESS: 0,
    DATA_EMPTY: 1,
    FAIL: -1,
    API_CALL_ERROR: -2,
    DB_FAILURE: -3,
    INVALID_PARAMS: -4
  },
  RESULT_MESSAGE: {
    SUCCESS: "api success",
    DATA_EMPTY: "data is empty",
    FAIL: "api failure",
    DB_FAILURE: "mongodb failure",
    INVALID_PARAMS: "invalid parameters"
  }
};