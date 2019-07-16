const Router = require('koa-router');
const boardApi = require('./api');
const { CONTENT_TYPE } = require('./utils/constants');

const api = new Router();

api.use('/board', (ctx, next) => contentTypeProvider(ctx, next), boardApi);

async function contentTypeProvider(ctx, next) {
  ctx.contentType = ctx.path.split('/')[3];
  await next();
}

module.exports = api;