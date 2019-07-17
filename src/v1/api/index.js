// TODO: refactoring
/* eslint-disable require-atomic-updates */
require('dotenv').config();

const Router = require('koa-router');

const contentController = require('../controllers/content.controller');
const fileController = require('../controllers/file.controller');
const commentController = require('../controllers/comment.controller');

const { RESULT_CODE } = require('../utils/constants');
const utils = require('../utils/utils');

const contentApi = new Router();

contentApi.post(['/notices', '/faqs', '/events', '/questions'], async ctx => {
  try {
    const resultCode = await contentController.create(ctx);
    ctx.body = utils.createResponse(resultCode, utils.getResultMessage(resultCode), null);
  } catch(ex) {
    ctx.body = utils.createResponse(RESULT_CODE.FAIL, ex.message, null);
  }
});

contentApi.get(['/notices', '/faqs', '/events', '/questions'], async (ctx, next) => {  
  try {
    const contents = await contentController.search(ctx);
    if (contents.length === 0) {
      ctx.body = utils.createResponse (RESULT_CODE.DATA_EMPTY, utils.getResultMessage(RESULT_CODE.DATA_EMPTY), []);
    } else {
      ctx.body = utils.createResponse (RESULT_CODE.SUCCESS, null, contents);
    }
  } catch(ex) {
    ctx.body = utils.createResponse (RESULT_CODE.FAIL, ex.message, null);
  }
});

contentApi.get(['/notices/:sn', '/faqs/:sn', '/events/:sn', '/questions/:sn'], async ctx => {
  try {
    const content = await contentController.searchOne(ctx);
    if (content) {
      ctx.body = utils.createResponse (RESULT_CODE.SUCCESS, null, content);
    } else {
      ctx.body = utils.createResponse (RESULT_CODE.DATA_EMPTY, utils.getResultMessage(RESULT_CODE.DATA_EMPTY), null);
    }  
  } catch(ex) {
    ctx.body = utils.createResponse (RESULT_CODE.FAIL, ex.message, null);
  }
});

contentApi.put(['/notices/:sn', '/faqs/:sn', '/events/:sn', '/questions/:sn'], async ctx => {
  try {
    const resultCode = await contentController.update(ctx);
    ctx.body = utils.createResponse (resultCode, utils.getResultMessage(resultCode), null);  
  } catch(ex) {
    ctx.body = utils.createResponse (RESULT_CODE.FAIL, ex.message, null);
  }
});

contentApi.delete(['/notices/:sn', '/faqs/:sn', '/events/:sn', '/questions/:sn'], async ctx => {
  try {
    const resultCode = await contentController.delete(ctx);
    ctx.body = utils.createResponse (resultCode, utils.getResultMessage(resultCode), null);  
  } catch(ex) {
    ctx.body = utils.createResponse (RESULT_CODE.FAIL, ex.message, null);
  }
});

contentApi.post([
  '/notices/:sn/comments', 
  '/faqs/:sn/comments', 
  '/events/:sn/comments', 
  '/questions/:sn/comments'], 
async ctx => {
  try {
    const resultCode = await commentController.create(ctx);
    ctx.body = utils.createResponse (resultCode, utils.getResultMessage(resultCode), null);  
  } catch(ex) {
    ctx.body = utils.createResponse (RESULT_CODE.FAIL, ex.message, null);
  }
});

contentApi.get([
  '/notices/:sn/comments', 
  '/faqs/:sn/comments', 
  '/events/:sn/comments', 
  '/questions/:sn/comments'], 
async ctx => {
  try {
    const comments = await commentController.search(ctx);
    if (comments) {
      ctx.body = utils.createResponse (RESULT_CODE.SUCCESS, null, comments);
    } else {
      ctx.body = utils.createResponse (RESULT_CODE.API_CALL_ERROR, utils.getResultMessage(RESULT_CODE.API_CALL_ERROR), null);
    }    
  } catch(ex) {
    ctx.body = utils.createResponse (RESULT_CODE.FAIL, ex.message, null);
  }
});

contentApi.put([
  '/notices/:sn/comments/:commentId', 
  '/faqs/:sn/comments/:commentId', 
  '/events/:sn/comments/:commentId', 
  '/questions/:sn/comments/:commentId'], 
async ctx => {
  try {
    const resultCode = await commentController.update(ctx);
    ctx.body = utils.createResponse (resultCode, utils.getResultMessage(resultCode), null);
  } catch(ex) {
    ctx.body = utils.createResponse (RESULT_CODE.FAIL, ex.message, null);
  }
});

contentApi.delete([
  '/notices/:sn/comments/:commentId', 
  '/faqs/:sn/comments/:commentId', 
  '/events/:sn/comments/:commentId', 
  '/questions/:sn/comments/:commentId'], 
async ctx => {
  try {
    const resultCode = await commentController.delete(ctx);
    ctx.body = utils.createResponse (resultCode, utils.getResultMessage(resultCode), null);
  } catch(ex) {
    ctx.body = utils.createResponse (RESULT_CODE.FAIL, ex.message, null);
  }
});

contentApi.post([
  '/notices/:sn/files', 
  '/faqs/:sn/files', 
  '/events/:sn/files', 
  '/questions/:sn/files'], 
async ctx => {
  try {
    const resultCode = await fileController.create(ctx);
    ctx.body = utils.createResponse (resultCode, utils.getResultMessage(resultCode), null);  
  } catch(ex) {
    ctx.body = utils.createResponse (RESULT_CODE.FAIL, ex.message, null);
  }
});

contentApi.delete([
  '/notices/:sn/files/:fileId', 
  '/faqs/:sn/files/:fileId', 
  '/events/:sn/files/:fileId', 
  '/questions/:sn/files/:fileId'], 
async ctx => {
  try {
    const resultCode = await fileController.delete(ctx);
    ctx.body = utils.createResponse (resultCode, utils.getResultMessage(resultCode), null);
  } catch(ex) {
    ctx.body = utils.createResponse (RESULT_CODE.FAIL, ex.message, null);
  }
});

module.exports = contentApi.routes();