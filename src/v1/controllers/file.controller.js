const Content = require('../models/content');
const { RESULT_CODE } = require('../utils/constants');
const utils = require('../utils/utils');

exports.create = (ctx) => {
  const { _id, fileId, fileName, fileSize } = ctx.request.body;

  // check parameters 
  if (_id === undefined) {
    return new Promise((resolve, reject) => { reject(new Error(utils.getResultMessage(RESULT_CODE.INVALID_PARAMS))); });
  }

  return Content.updateOne({ _id }, { $push: { attachedFiles: { fileId, fileName, fileSize }}})
    .then(result => {
      if (result.ok == 1) return RESULT_CODE.SUCCESS;
      else return RESULT_CODE.FAIL;
    });
};

exports.delete = (ctx) => {
  const { _id, fileId } = ctx.request.body;

  // check parameters
  if (_id === undefined || fileId === undefined) {
    return new Promise((resolve, reject) => { reject(new Error(utils.getResultMessage(RESULT_CODE.INVALID_PARAMS))); });
  }

  return Content.updateOne({ _id }, { $pull: { attachedFiles: { fileId }}})
    .then(result => {
      if (result.ok == 1) return RESULT_CODE.SUCCESS;
      else return RESULT_CODE.FAIL;
    });
};