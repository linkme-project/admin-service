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

contentApi.post('/contents', async ctx => {
  await contentController.create(ctx)
    .then(resultCode => {
      ctx.body = utils.createResponse(resultCode, utils.getResultMessage(resultCode), null);
    })
    .catch(ex => {
      ctx.body = utils.createResponse(RESULT_CODE.FAIL, ex.message, null);
    });
});

contentApi.get('/contents', async ctx => {
  await contentController.search(ctx)
    .then(contents => {
      // change field name (_id to commentId)
      contents.map(content => {
        let comments = JSON.parse(JSON.stringify(content.comments));
        comments.map(comment => {
          comment.commentId = comment._id;
          delete comment._id;
        });
        Object.assign(content.comments, comments);
      });
      return contents;
    })
    .then(contents => {
      if (contents.length === 0) {
        ctx.body = utils.createResponse (RESULT_CODE.DATA_EMPTY, utils.getResultMessage(RESULT_CODE.DATA_EMPTY), []);
      } else {
        ctx.body = utils.createResponse (RESULT_CODE.SUCCESS, null, contents);
      }
    })
    .catch(ex => {
      ctx.body = utils.createResponse (RESULT_CODE.FAIL, ex.message, null);
    });
});

contentApi.get('/contents/:_id', async ctx => {
  await contentController.searchOne(ctx)
    .then(content => {
      let comments = JSON.parse(JSON.stringify(content.comments));
      comments.map(comment => {
        comment.commentId = comment._id;
        delete comment._id;
      });
      Object.assign(content.comments, comments);
      return content;
    })
    .then(content => {
      if (!content) {
        ctx.body = utils.createResponse (RESULT_CODE.DATA_EMPTY, utils.getResultMessage(RESULT_CODE.DATA_EMPTY), null);
      } else {
        ctx.body = utils.createResponse (RESULT_CODE.SUCCESS, null, content);
      }
    })
    .catch(ex => {
      ctx.body = utils.createResponse (RESULT_CODE.FAIL, ex.message, null);
    });
});

contentApi.put('/contents', async ctx => {  
  await contentController.update(ctx)
    .then(resultCode => {
      ctx.body = utils.createResponse (resultCode, utils.getResultMessage(resultCode), null);
    })
    .catch(ex => {
      ctx.body = utils.createResponse (RESULT_CODE.FAIL, ex.message, null);
    });
});

contentApi.delete('/contents', async ctx => {
  await contentController.delete(ctx)
    .then(resultCode => {
      ctx.body = utils.createResponse (resultCode, utils.getResultMessage(resultCode), null);
    })
    .catch(ex => {
      ctx.body = utils.createResponse (RESULT_CODE.FAIL, ex.message, null);
    });
});

contentApi.post('/comments', async ctx => {
  await commentController.create(ctx)
    .then(resultCode => {
      ctx.body = utils.createResponse (resultCode, utils.getResultMessage(resultCode), null);
    })
    .catch(ex => {
      ctx.body = utils.createResponse (RESULT_CODE.FAIL, ex.message, null);
    });
});

contentApi.put('/comments', async ctx => {
  await commentController.update(ctx)
    .then(resultCode => {
      ctx.body = utils.createResponse (resultCode, utils.getResultMessage(resultCode), null);
    })
    .catch(ex => {
      ctx.body = utils.createResponse (RESULT_CODE.FAIL, ex.message, null);
    });
});

contentApi.delete('/comments', async ctx => {
  await commentController.delete(ctx)
    .then(resultCode => {
      ctx.body = utils.createResponse (resultCode, utils.getResultMessage(resultCode), null);
    })
    .catch(ex => {
      ctx.body = utils.createResponse (RESULT_CODE.FAIL, ex.message, null);
    });
});

contentApi.post('/files', async ctx => {
  await fileController.create(ctx)
    .then(resultCode => {
      ctx.body = utils.createResponse (resultCode, utils.getResultMessage(resultCode), null);
    })
    .catch(ex => {
      ctx.body = utils.createResponse (RESULT_CODE.FAIL, ex.message, null);
    });
});

contentApi.delete('/files', async ctx => {
  await fileController.delete(ctx)
    .then(resultCode => {
      ctx.body = utils.createResponse (resultCode, utils.getResultMessage(resultCode), null);
    })
    .catch(ex => {
      ctx.body = utils.createResponse (RESULT_CODE.FAIL, ex.message, null);
    });
});

module.exports = contentApi;