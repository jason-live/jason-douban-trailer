const Router = require('koa-router');
const mongoose = require('mongoose');

const router = new Router();

router.get('/movies/all', async (ctx, next) => {
  const Movie = mongoose.model('Movie');
  const movies = await Movie.find({}).sort({
    'meta.createAt': -1,
  });

  ctx.body = {
    movies,
  }
});

router.get('/movies/detail/:id', async (ctx, next) => {
  const Movie = mongoose.model('Movie');
  const id = ctx.params.id;
  const movie = await Movie.findOne({
    doubanId: id,
  });

  ctx.body = {
    movie,
  }
});

module.exports =  router;