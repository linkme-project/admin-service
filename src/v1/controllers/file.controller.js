const validator = require('validator');
const utils = require('../utils/utils');
const Content = require('../models/content');

const { RESULT_CODE } = require('../utils/constants');

exports.create = (ctx) => {
  const { fileId, fileName, fileSize } = ctx.request.body;
  const { sn } = ctx.params;

  // check parameters 
  if (!validator.isInt(sn + '')) {
    return new Promise((resolve, reject) => { reject(new Error(utils.getResultMessage(RESULT_CODE.INVALID_PARAMS))); });
  }

  return Content.updateOne({ sn }, { $push: { attachedFiles: { fileId, fileName, fileSize }}})
    .then(result => {
      return utils.getResultCodeByMongooseResult(result);
    });
};

exports.delete = (ctx) => {
  const { sn, fileId } = ctx.params;

  // check parameters
  if (!validator.isInt(sn + '') || fileId == undefined) {
    return new Promise((resolve, reject) => { reject(new Error(utils.getResultMessage(RESULT_CODE.INVALID_PARAMS))); });
  }

  return Content.updateOne({ sn }, { $pull: { attachedFiles: { fileId }}})
    .then(result => {
      return utils.getResultCodeByMongooseResult(result);
    });
};
