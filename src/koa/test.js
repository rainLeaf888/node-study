// const Koa = require('koa');
const Koa = require('./index')
const app = new Koa()

app.use(async (ctx, next) => {
  console.log('test1')
  ctx.body = 'hello koa'
  await next();
  console.log('test2');
});
app.use(async (ctx, next) => {
  console.log('test3, url:', ctx.req.url)
  await next();
  console.log('test4');
});

app.listen(5000);