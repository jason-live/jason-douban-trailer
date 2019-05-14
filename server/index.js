const Koa = require('koa');
const views = require('koa-views');
const { resolve } = require('path');
const { connect, initSchemas } = require('./database/init');
const mongoose = require('mongoose');

const app = new Koa();

;(async () => {
  await connect();
  await initSchemas();

  const Movie = mongoose.model('Movie');
  const movies = await Movie.find({});

  console.log(movies);
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