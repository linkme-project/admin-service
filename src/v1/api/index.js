// TODO: refactoring
/* eslint-disable require-atomic-updates */
require('dotenv').config();

const Router = require('koa-router');

const contentController = require('../controllers/content.controller');
const fileController = require('../controllers/file.controller');
const commentController = require('../controllers/comment.controller');

const RESULT_CODE = require('../constants').RESULT_CODE;

const contentApi = new Router();

contentApi.post('/contents', async ctx => {
  try {
    const result = await contentController.create(ctx);
    ctx.body = {
      resultCode: result,
      resultMessage: 
        result == RESULT_CODE.FAIL ? 'insert content failure' :
          result == RESULT_CODE.SUCCESS ? 'insert content success' : 
            result == RESULT_CODE.INVALID_PARAMS ? 'invalid parameters' : null,
      returnValue: null
    };
  } catch (ex) {
    ctx.body = {
      resultCode: RESULT_CODE.FAIL,
      resultMessage: ex.message,
      returnValue: null
    };
  }
});

contentApi.get('/contents', async ctx => {
  try {
    const contents = await contentController.search(ctx);
    ctx.body = {
      resultCode: contents.length === 0 ? RESULT_CODE.DATA_EMPTY : RESULT_CODE.SUCCESS,
      resultMessage: contents.length === 0 ? 'Data is not exist' : null,
      returnValue: contents
    };
  } catch (ex) {
    ctx.body = {
      resultCode: ex.resultCode ? ex.resultCode : RESULT_CODE.FAIL,
      resultMessage: ex.resultMessage ? ex.resultMessage : ex.message,
      returnValue: null
    };
  }
});

contentApi.get('/contents/:_id', async ctx => {
  try {
    const content = await contentController.searchOne(ctx);
    ctx.body = {
      resultCode: content === null ? RESULT_CODE.DATA_EMPTY : RESULT_CODE.SUCCESS,
      resultMessage: content === null? 'Data is not exist' : null,
      returnValue: content
    };
  } catch (ex) {
    ctx.body = {
      resultCode: ex.resultCode ? ex.resultCode : RESULT_CODE.FAIL,
      resultMessage: ex.resultMessage ? ex.resultMessage : ex.message,
      returnValue: null
    };
  }
});

contentApi.put('/contents', async ctx => {  
  try {
    const result = await contentController.update(ctx);
    ctx.body = {
      resultCode: result,
      resultMessage: 
        result == RESULT_CODE.FAIL ? 'update content failure' :
          result == RESULT_CODE.SUCCESS ? 'update content success' : 
            result == RESULT_CODE.INVALID_PARAMS ? 'invalid parameters' : null,
      returnValue: null
    };
  } catch (ex) {
    ctx.body = {
      resultCode: RESULT_CODE.FAIL,
      resultMessage: ex.message,
      returnValue: null
    };
  }
});

contentApi.delete('/contents', async ctx => {
  try {
    const result = await contentController.delete(ctx);
    ctx.body = {
      resultCode: result,
      resultMessage: 
        result == RESULT_CODE.FAIL ? 'mongodb delete failure' :
          result == RESULT_CODE.SUCCESS ? 'successfully delete content' : 
            result == RESULT_CODE.INVALID_PARAMS ? 'invalid parameters' : null,
      returnValue: null
    };
  } catch (ex) {
    ctx.body = {
      resultCode: RESULT_CODE.FAIL,
      resultMessage: ex.message,
      returnValue: null
    };
  }
});

contentApi.post('/comments', async ctx => {
  try {
    const result = await commentController.create(ctx);
    ctx.body = {
      resultCode: result,
      resultMessage: 
        result == RESULT_CODE.FAIL ? 'insert comment failure' :
          result == RESULT_CODE.SUCCESS ? 'insert comment success' : 
            result == RESULT_CODE.INVALID_PARAMS ? 'invalid parameters' : null,
      returnValue: null
    };
  } catch (ex) {
    ctx.body = {
      resultCode: RESULT_CODE.FAIL,
      resultMessage: ex.message,
      returnValue: null
    };
  }
});

contentApi.put('/comments', async ctx => {

});

contentApi.delete('/comments', async ctx => {

});

contentApi.post('/files', async ctx => {

});

contentApi.delete('/files', async ctx => {

});

module.exports = contentApi;