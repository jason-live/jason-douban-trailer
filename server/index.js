const Koa = require('koa');
const views = require('koa-views');
const { resolve } = require('path');
const { connect, initSchemas, initAdmin } = require('./database/init');
const mongoose = require('mongoose');
const router = require('./routes');

const app = new Koa();

;(async () => {
  await connect();
  await initSchemas();
  await initAdmin();

  // require('./tasks/movie');
  // require('./tasks/api');
  // require('./tasks/trailer');
  // require('./tasks/qiniu');
})();

app
  .use(router.routes())
  .use(router.allowedMethods());

app.use(views(resolve(__dirname, './views'), {
  extension: 'pug',
}))

app.use(async (ctx, next) => {
  await ctx.render('index', {
    you: 'Luke',
    me: 'Jason',
  });
});

app.listen(4455);