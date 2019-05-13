const Koa = require('koa');
const views = require('koa-views');
const { resolve } = require('path');
const { connect } = require('./database/init');

const app = new Koa();

;(async () => {
  await connect();
})();

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