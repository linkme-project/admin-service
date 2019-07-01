require('dotenv').config();

const Router = require('koa-router');

const contentController = require('../contents/content.controller');

const contentApi = new Router();

contentApi.post('/contents', async ctx => {
  const result = await contentController.create(ctx);
});

contentApi.get('/contents', async ctx => {
  const result = await contentController.search(ctx);
});

contentApi.get('/contents/:sn', ctx => {
  const result = contentController.searchSingle(ctx);
  
  ctx.body = result;
});

contentApi.put('/contents', ctx => {
  const result = contentController.create(ctx);
  
  ctx.body = result;
});

contentApi.delete('/contents', ctx => {
  const result = contentController.create(ctx);
  
  ctx.body = result;
});

module.exports = contentApi;