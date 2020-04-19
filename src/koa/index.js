const http = require('http');
const request = require('./request');
const response = require('./response');
const context = require('./context');

class Kkb {
  constructor() {
    this.middlewares = [];
  }

  listen(...args) {
    const server = http.createServer(async (req, res) => {
      const ctx = this.createContext(req, res);
      const fn = this.compose(this.middlewares);
      await fn(ctx)
      res.end(ctx.body);
    });
    server.listen(...args);
  }

  // 构建上下⽂文, 把res和req都挂载到ctx之上，并且在ctx.req和ctx.request.req同时保存
  createContext(req, res) {
    const ctx = Object.create(context);
    ctx.request = Object.create(request);
    ctx.response = Object.create(response);
    ctx.req = ctx.request.req = req;
    ctx.res = ctx.response.res = res;
    return ctx;
  }

  use(fn) {
    this.middlewares.push(fn);
  }

  compose(middlewares) {
    return function (ctx) {
      return dispatch(0);
      function dispatch(index) {
        const fn = middlewares[index];
        if (!fn) return Promise.resolve();

        try {
          return Promise.resolve(
            fn(ctx, function next() { // 将上下⽂文传⼊入中间件，mid(ctx,next)
              return dispatch(index + 1);
            })
          )
          // return Promise.resolve(fn(ctx, dispatch.bind(null, i + 1)));
        } catch (err) {
          return Promise.reject(err)
        }
      }
    }

  }
}
module.exports = Kkb;