const cp = require('child_process');
const { resolve } = require('path');

const mongoose = require('mongoose');
const Movie = mongoose.model('Movie');

; (async () => {
  let movies = await Movie.find({
    $or: [
      { video: { $exists: false }},
      { video: null }
    ]
  });

  const script = resolve(__dirname, '../crawler/video')

  const child = cp.fork(script, []);

  let invoke = false;

  child.on('error', err => {
    if (invoke) {
      return;
    }
    invoke = true;
    console.log(err);
  });

  child.on('exit', code => {
    if (invoke) {
      return;
    }
    invoke = true;
    let err = code === 0 ? null : new Error('exit code' + code);

    console.log(err);
  });

  child.on('message', async data => {
    // https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2552058346.jpg

    let doubanId = data.doubanId;
    let movie = await Movie.findOne({
      doubanId,
    });

    if (data.video) {
      movie.video = data.video;
      movie.cover = data.cover;

      await movie.save();
    } else {
      await movie.remove();
    }

    console.log(data);
  });

  child.send(movies);

})();