require('dotenv').config();

const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

mongoose.Promise = global.Promise;

// For mongoose deprecation warnings, see https://mongoosejs.com/docs/deprecations.html
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true
})
  .then(
    response => {
      console.log('Successfully connected to mongodb');
    }
  ).catch(ex => {
    console.error(ex);
  });

autoIncrement.initialize(mongoose.connection);

const {
  PORT: port,
  API_VERSION: apiVersion
} = process.env;

// set api router to /<apiVersion>. e.g. /v1 
const api = require(`./${apiVersion}`);

const router = new Router();
router.use(`/${apiVersion}`, api.routes());

const app = new Koa();
app.use(bodyParser());
app.use(api.routes());
app.use(router.allowedMethods());

app.listen(port, () => {
  console.log(`board service is listening on port ${port}`);
});

process.on('uncaughtException', function(err) {
  // handle the error safely
  console.log(err);
});