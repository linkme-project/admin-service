const Content = require('../models/content');
const validator = require('validator');
const RESULT_CODE = require('../constants').RESULT_CODE;

// return resultCode
exports.create = async (ctx) => {
  const {
    title,          // required
    content,        // required
    userId,         // required
    thumbnail,
    additional,
    attachedFiles,
    type,           // required
    key
  } = ctx.request.body;
  
  // check parameters 
  if (!title || !content || !userId || type === undefined || !validator.isInt(type.toString())) {
    return RESULT_CODE.INVALID_PARAMS;
  }

  // get next sn
  let result, nextSn;
  try {
    result = await Content.find({ type: type }).exec();
    if (result.length == 0) {
      nextSn = 1;
    } else {
      nextSn = result[result.length - 1].sn + 1;
    }  
  } catch (ex) {
    return RESULT_CODE.FAIL;
  }
  
  let comments = [];
  let regDate = new Date();

  const newItem = new Content({
    sn: nextSn,
    title,
    content,
    userId,
    thumbnail,
    additional,
    attachedFiles,
    comments,  // comments
    regDate,
    type,
    key
  });
  
  try {
    await newItem.save();
  } catch (ex) {
    return RESULT_CODE.FAIL;
  }

  return RESULT_CODE.SUCCESS;  
};

// return contents array
exports.search = async (ctx) => {
  const {
    userId,
    key,
    type,     // required
    pageSize, // required
    pageNo    // required
  } = ctx.request.query;

  // check parameters
  if (type === undefined || pageSize === undefined || pageNo === undefined || !validator.isInt(type.toString())) {
    throw { resultCode: RESULT_CODE.INVALID_PARAMS, resultMessage: 'Invalid Parameters' };
  }

  let result = await Content.find((userId ? { type, userId } : { type })).exec();

  // TODO: paging

  return result;
};

exports.searchOne = async (ctx) => {
  const { type } = ctx.request.query;
  const { _id } = ctx.params;

  // check parameters 
  if (type === undefined || _id === undefined) {
    throw { resultCode: RESULT_CODE.INVALID_PARAMS, resultMessage: 'Invalid Parameters' };
  }

  if (!validator.isInt(type)) {
    throw { resultCode: RESULT_CODE.INVALID_PARAMS, resultMessage: 'Invalid Parameters' };
  }

  let result = await Content.find({ type, _id }).exec();
  if (result.length === 0) return null;

  return result;
};

exports.update = async (ctx) => {
  const { _id, title, content, userId, attachedFiles } = ctx.request.body;

  // check parameters 
  if (_id === undefined) {
    return RESULT_CODE.INVALID_PARAMS;
  }

  const updateItem = {
    title: title,
    content: content,
    userId: userId,
    attachedFiles: attachedFiles
  };

  try {
    await Content.update({ _id }, updateItem);
  } catch (ex) {
    return RESULT_CODE.FAIL;
  }

  return RESULT_CODE.SUCCESS;
};

exports.delete = async (ctx) => {
  const { _id } = ctx.request.body;

  // check parameters 
  if (_id === undefined) {
    throw { resultCode: RESULT_CODE.INVALID_PARAMS, resultMessage: 'Invalid Parameters' };
  }

  let result = await Content.remove({ _id }).exec();
  if (result.ok == 1) return RESULT_CODE.SUCCESS;
  else return RESULT_CODE.FAIL;
};