require('dotenv').config();

const {
    PORT: port
} = process.env;

const Koa = require('koa');

const app = new Koa();

app.listen(port, () => {
    console.log(`admin service is listening on port ${port}`)
});