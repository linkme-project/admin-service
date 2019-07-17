const Content = require('../models/content');
const validator = require('validator');

const { RESULT_CODE } = require('../utils/constants');
const utils = require('../utils/utils');

exports.create = ctx => {
  const {
    title,          // required
    content,        // required
    userId,         // required
    thumbnail,
    additional,
    attachedFiles,
    key
  } = ctx.request.body;

  // parameters validation
  if (!title || !content || !userId) {
    return new Promise((resolve, reject) => { reject(new Error(utils.getResultMessage(RESULT_CODE.INVALID_PARAMS))); });
  }

  return new Promise((resolve, reject) => {
    const type = ctx.contentType;
    const regDate = new Date();
    const newItem = new Content({
      title,
      content,
      userId,
      thumbnail,
      additional,
      attachedFiles,
      comments: [],  // comments
      regDate,
      type,
      key
    });

    newItem.save();
    resolve(RESULT_CODE.SUCCESS);
  });
};

// return contents array
exports.search = ctx => {
  const {
    userId,
    key,
  } = ctx.request.query;

  return Content.find(utils.deleteUndefinedKeys({ type: ctx.contentType, userId, key }))
    .select('-_id sn title content userId thumbnail attachedFiles comments regDate type key');
};

exports.searchOne = ctx => {
  const { sn } = ctx.params;

  // check parameters 
  if (!validator.isInt(sn + '')) {
    return new Promise((resolve, reject) => { reject(new Error(utils.getResultMessage(RESULT_CODE.INVALID_PARAMS))); });
  }

  return Content.findOne({ sn })
    .select('-_id sn title content userId thumbnail attachedFiles comments regDate type key');
};

exports.update = ctx => {
  const { title, content, userId, thumbnail, additional, attachedFiles, key } = ctx.request.body;
  const { sn } = ctx.params;

  // check parameters 
  if (!validator.isInt(sn + '')) {
    return new Promise((resolve, reject) => { reject(new Error(utils.getResultMessage(RESULT_CODE.INVALID_PARAMS))); });
  }

  const updateItem = utils.deleteUndefinedKeys({
    title,
    content,
    userId,
    thumbnail,
    additional,
    attachedFiles,
    key
  });

  return Content.updateOne({ sn }, updateItem)
    .then(result => {
      return utils.getResultCodeByMongooseResult(result);
    });
};

exports.delete = ctx => {
  const { sn } = ctx.params;

  // check parameters 
  if (!validator.isInt(sn + '')) {
    return new Promise((resolve, reject) => { reject(new Error(utils.getResultMessage(RESULT_CODE.INVALID_PARAMS))); });
  }

  return Content.deleteOne({ sn })
    .then(result => {
      return utils.getResultCodeByMongooseResult(result);
    });
};
