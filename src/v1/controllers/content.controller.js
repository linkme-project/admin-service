const Content = require('../models/content');
const validator = require('validator');
const { RESULT_CODE, RESULT_MESSAGE } = require('../utils/constants');
const utils = require('../utils/utils');

exports.create = ctx => {
  const {
    title,          // required
    content,        // required
    userId,         // required
    type,           // required
    thumbnail,
    additional,
    attachedFiles,
    key
  } = ctx.request.body;

  // parameters validation
  if (!title || !content || !userId || type === undefined || !validator.isInt(type.toString())) {
    return new Promise((resolve, reject) => { reject(new Error(utils.getResultMessage(RESULT_CODE.INVALID_PARAMS))); });
  }

  return Content.find({ type: type })
    .then(contents => {
      // get next sn
      if (contents.length == 0) return 1;
      else return contents[contents.length - 1].sn + 1; })
    .then(nextSn => {
      // create & save new item
      let regDate = new Date();

      const newItem = new Content({
        sn: nextSn,
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
      return RESULT_CODE.SUCCESS;
    });
};

// return contents array
exports.search = ctx => {
  const {
    userId,
    key,
    type,     // required
    pageSize, // required
    pageNo    // required
  } = ctx.request.query;

  // parameters validation
  if (type === undefined || pageSize === undefined || pageNo === undefined || !validator.isInt(type.toString())) {
    return new Promise((resolve, reject) => { reject(new Error(utils.getResultMessage(RESULT_CODE.INVALID_PARAMS))); });
  }

  return Content.find(utils.deleteUndefinedKeys({ type, userId, key }))
    .then(contents => {
      // TODO: paging

      return contents;
    });
};

exports.searchOne = ctx => {
  const { type } = ctx.request.query;
  const { _id } = ctx.params;

  // check parameters 
  if (type === undefined || _id === undefined || !validator.isInt(type)) {
    return new Promise((resolve, reject) => { reject(new Error(utils.getResultMessage(RESULT_CODE.INVALID_PARAMS))); });
  }

  return Content.findOne({ type, _id });
};

exports.update = ctx => {
  const { _id, title, content, userId, thumbnail, additional, attachedFiles, key } = ctx.request.body;

  // check parameters 
  if (_id === undefined) {
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

  return Content.updateOne({ _id }, updateItem)
    .then(result => {
      if (result.ok == 1) return RESULT_CODE.SUCCESS;
      else return RESULT_CODE.FAIL;
    });
};

exports.delete = ctx => {
  const { _id } = ctx.request.body;

  // check parameters 
  if (_id === undefined) {
    return new Promise((resolve, reject) => { reject(new Error(utils.getResultMessage(RESULT_CODE.INVALID_PARAMS))); });
  }

  return Content.deleteOne({ _id })
    .then(result => {
      if (result.ok == 1) return RESULT_CODE.SUCCESS;
      else return RESULT_CODE.FAIL;
    });
};
