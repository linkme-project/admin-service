const validator = require('validator');
const utils = require('../utils/utils');
const Content = require('../models/content');
const Comment = require('../models/comment');

const mongoose = require('mongoose');

const { RESULT_CODE } = require('../utils/constants');

exports.create = (ctx) => {
  const { content, userId } = ctx.request.body;
  const { sn } = ctx.params;

  // check parameters 
  if (!validator.isInt(sn + '')) {
    return new Promise((resolve, reject) => { reject(new Error(utils.getResultMessage(RESULT_CODE.INVALID_PARAMS))); });
  }

  const CommentModel = mongoose.model('comment', Comment);
  const newComment = new CommentModel({
    content,
    userId
  });

  return Content.updateOne({ sn }, { $push: { comments: newComment}})
    .then(result => {
      return utils.getResultCodeByMongooseResult(result);
    });
};

exports.search = (ctx) => {
  const { sn } = ctx.params;

  // check parameters 
  if (!validator.isInt(sn + '')) {
    return new Promise((resolve, reject) => { reject(new Error(utils.getResultMessage(RESULT_CODE.INVALID_PARAMS))); });
  }

  return Content.findOne({ sn })
    .then(result => {
      return result.comments;
    });
};

exports.update = (ctx) => {
  const { content, userId } = ctx.request.body;
  const { sn, commentId } = ctx.params;

  // check parameters 
  if (commentId == undefined || !validator.isInt(sn + '')) {
    return new Promise((resolve, reject) => { reject(new Error(utils.getResultMessage(RESULT_CODE.INVALID_PARAMS))); });
  }

  return Content.updateOne({ 'comments._id': commentId }, { 'comments.$': { content, userId }})
    .then(result => {
      return utils.getResultCodeByMongooseResult(result);
    });
};

exports.delete = (ctx) => {
  const { sn, commentId } = ctx.params;

  // check parameters 
  if (commentId == undefined || !validator.isInt(sn + '')) {
    return new Promise((resolve, reject) => { reject(new Error(utils.getResultMessage(RESULT_CODE.INVALID_PARAMS))); });
  }

  return Content.updateOne({ sn }, { $pull: { comments: { _id: commentId }}})
    .then(result => {
      return utils.getResultCodeByMongooseResult(result);
    });
};