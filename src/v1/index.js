const Router = require('koa-router');
const boardApi = require('./api');

const api = new Router();

api.use('/board', boardApi.routes());

module.exports = api;