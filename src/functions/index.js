const functions = require('firebase-functions');
const next = require('next');
const routes = require('./routes');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, conf: { distDir: 'next' } });

// refs: https://github.com/fridays/next-routes#on-the-server
const handler = routes.getRequestHandler(app, ({
  req, res, route, query,
}) => {
  if (route.pathname === '/detail') {
    app.render(req, res, '/detail', query);
  } else {
    app.render(req, res, route.page, query);
  }
});

const runtimeOpts = {
  memory: '512MB'
};

exports.next = functions.runWith(runtimeOpts).https.onRequest((req, res) => {
  console.log('File: ' + req.originalUrl)
  return app.prepare().then(() => handler(req, res))
});
