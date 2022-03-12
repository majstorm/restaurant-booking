const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Booking Restaurant';
});

app.listen(7500);