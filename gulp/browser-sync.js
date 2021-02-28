const browserSync = require('browser-sync');
const server = browserSync.create();
const config = require('./_config');

async function reload() {
  return server.reload();
}

const serve = done => {
  server.init({
    open: false,
    server: {
      baseDir: config.output,
    },
  });

  done();
};

exports.reload = reload;
exports.browserSync = serve;
