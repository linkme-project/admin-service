const Content = require('../models/content');
const validator = require('validator');
const RESULT_CODE = require('../constants').RESULT_CODE;

// return resultCode
exports.create = async (ctx) => {
  const {
    title,
    content,
    userId,
    attachedFiles,
    type
  } = ctx.request.body;
  
  // check parameters 
  if (!title || !content || !userId || (type === undefined || type === null)) {
    return RESULT_CODE.INVALID_PARAMS;
  }

  if (!validator.isInt(type.toString())) {
    return RESULT_CODE.INVALID_PARAMS;
  }

  // get next sn
  let result;
  try {
    result = await Content.find({ type: type }).exec();
  } catch (ex) {
    return RESULT_CODE.FAIL;
  }

  let nextSn = result.length + 1; // TODO: need to change
  let comments = [];
  let regDate = new Date();

  const newItem = new Content({
    sn: nextSn,
    title,
    content,
    userId,
    attachedFiles,
    comments, // comments
    regDate,
    type    
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
    pageSize,
    pageNo,
    type
  } = ctx.request.query;

  // check parameters 
  if (type === undefined || pageSize === undefined || pageNo === undefined) {
    throw { resultCode: RESULT_CODE.INVALID_PARAMS, resultMessage: 'Invalid Parameters' };
  }

  if (!validator.isInt(type.toString())) {
    throw { resultCode: RESULT_CODE.INVALID_PARAMS, resultMessage: 'Invalid Parameters' };
  }

  let result = await Content.find((userId ? { type, userId } : { type })).exec();
  let refinedResult = JSON.parse(JSON.stringify( result ));
  refinedResult.map(content => {
    delete content._id;
    delete content.__v;
  });

  return refinedResult;
};

exports.searchOne = async (ctx) => {
  const { type } = ctx.request.query;
  const { sn } = ctx.params;

  // check parameters 
  if (type === undefined || sn === undefined) {
    throw { resultCode: RESULT_CODE.INVALID_PARAMS, resultMessage: 'Invalid Parameters' };
  }

  if (!validator.isInt(type) || !validator.isInt(sn)) {
    throw { resultCode: RESULT_CODE.INVALID_PARAMS, resultMessage: 'Invalid Parameters' };
  }

  let result = await Content.find({ type, sn }).exec();
  if (result.length === 0) return null;

  let refinedResult = JSON.parse(JSON.stringify( result[0] ));
  delete refinedResult._id;
  delete refinedResult.__v;
  return refinedResult;
};

exports.update = (ctx) => {
  // TODO
};

exports.delete = async (ctx) => {
  const { type, sn } = ctx.request.body;

  // check parameters 
  if (type === undefined || sn === undefined) {
    throw { resultCode: RESULT_CODE.INVALID_PARAMS, resultMessage: 'Invalid Parameters' };
  }

  if (!validator.isInt(type.toString()) || !validator.isInt(sn.toString())) {
    throw { resultCode: RESULT_CODE.INVALID_PARAMS, resultMessage: 'Invalid Parameters' };
  }

  let result = await Content.remove({ type, sn }).exec();
  if (result.ok == 1) return RESULT_CODE.SUCCESS;
  else return RESULT_CODE.FAIL;
};