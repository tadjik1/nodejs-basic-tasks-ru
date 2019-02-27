const Koa = require('koa');
const app = new Koa();

app.use(require('koa-logger')());
app.use(require('koa-bodyparser')());

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (err.status) {
      ctx.status = err.status;
      ctx.body = err.message;
    } else {
      console.error(err);

      ctx.status = 500;
      ctx.body = 'Internal server error';
    }
  }
});

const Router = require('koa-router');
const router = new Router();

router.get('/users', async (ctx) => {});

router.get('/users/:id', async (ctx) => {});

router.patch('/users/:id', async (ctx) => {});

router.post('/users', async (ctx) => {});

router.delete('/users/:id', async (ctx) => {});

app.use(router.routes());

module.exports = app;
