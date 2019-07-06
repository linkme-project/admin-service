const Content = require('../models/content');
const Comment = require('../models/comment');
const { RESULT_CODE } = require('../utils/constants');
const utils = require('../utils/utils');

exports.create = (ctx) => {
  const { _id, content, userId } = ctx.request.body;

  // check parameters 
  if (_id === undefined) {
    return new Promise((resolve, reject) => { reject(new Error(utils.getResultMessage(RESULT_CODE.INVALID_PARAMS))); });
  }

  return Content.updateOne({ _id }, { $push: { comments: { content, userId }}})
    .then(result => {
      if (result.ok == 1) return RESULT_CODE.SUCCESS;
      else return RESULT_CODE.FAIL;
    });
};

exports.update = (ctx) => {
  const { commentId, content, userId } = ctx.request.body;

  // check parameters 
  if ( commentId === undefined) {
    return new Promise((resolve, reject) => { reject(new Error(utils.getResultMessage(RESULT_CODE.INVALID_PARAMS))); });
  }

  return Content.updateOne({ 'comments._id': commentId }, { 'comments.$': { content, userId }})
    .then(result => {
      if (result.ok == 1) return RESULT_CODE.SUCCESS;
      else return RESULT_CODE.FAIL;
    });};

exports.delete = (ctx) => {
  const { _id, commentId } = ctx.request.body;

  // check parameters 
  if (_id === undefined || commentId === undefined) {
    return new Promise((resolve, reject) => { reject(new Error(utils.getResultMessage(RESULT_CODE.INVALID_PARAMS))); });
  }

  return Content.updateOne({ _id }, { $pull: { comments: { _id: commentId }}})
    .then(result => {
      if (result.ok == 1) return RESULT_CODE.SUCCESS;
      else return RESULT_CODE.FAIL;
    });
};