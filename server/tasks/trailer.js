const cp = require('child_process');

const { resolve } = require('path');

; (async () => {
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

  child.on('message', data => {
    // https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2552058346.jpg
    console.log(data);
  });

})();