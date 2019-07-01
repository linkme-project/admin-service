const Content = require('../models/content');
const RESULT_CODE = require('../constants').RESULT_CODE;

exports.create = async (ctx) => {
  const {
    title,
    content,
    userId,
    attachedFiles,
    type
  } = ctx.request.body;
  
  // check parameters 
  if (!title || !content || !userId || (type === undefined)) {
    return RESULT_CODE.INVALID_PARAMS;
  }

  // get next sn 
  let result = await Content.find({ type: type }).exec();
  let nextSn = 0; 

  if (result.length == 0) {
    nextSn = 1;
  } else {
    nextSn = result.length;
  }

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
  } catch (e) {
    return RESULT_CODE.FAIL;
  }

  return RESULT_CODE.SUCCESS;  
};

exports.search = async (ctx) => {
  let result = await Content.find().exec();
};

exports.searchSingle = (ctx) => {
  // TODO
};

exports.update = (ctx) => {
  // TODO
};

exports.delete = (ctx) => {
  // TODO
};