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
    COMMENT_API: {
      SUCCESS: "comment api success",
      DATA_EMPTY: "data is empty",
      FAIL: "comment api failure",
      DB_FAILURE: "mongodb failure",
      INVALID_PARAMS: "invalid parameters"
    },
    CONTENT_API: {
      SUCCESS: "content api success",
      DATA_EMPTY: "data is empty",
      FAIL: "content api failure",
      DB_FAILURE: "mongodb failure",
      INVALID_PARAMS: "invalid parameters"
    },
    FILE_API: {
      SUCCESS: "insert attachedFiles success",
      DATA_EMPTY: "data is empty",
      FAIL: "file api failure",
      DB_FAILURE: "mongodb failure",
      INVALID_PARAMS: "invalid parameters"
    }
  },
  getResultCodeKeys (resultCode) {
    for (let code in this.RESULT_CODE) {
      if (this.RESULT_CODE[code] == resultCode) {
        return code;
      }
    }
    return null;
  }
};