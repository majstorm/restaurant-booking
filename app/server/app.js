require('dotenv').config();
const Koa = require('koa');
const Router = require('@koa/router')
const Mongoose = require('mongoose')

const app = new Koa();
const router = new Router();

const mongoURI = process.env.MONGO_URI;

Mongoose
  .connect(
    'mongodb://mongodb:27017/restaurant',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

router.get('main', '/', (ctx) => {
    ctx.body = 'Booking Restaurant!';
  });

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(7500);