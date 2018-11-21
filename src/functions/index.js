const functions = require('firebase-functions');
const next = require('next');
const routes = require('./routes');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, conf: { distDir: 'next' } });

// refs: https://github.com/fridays/next-routes#on-the-server
const handler = routes.getRequestHandler(app, ({
  req, res, route, query,
}) => {
  if (route.page === '/') {
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
  } else {
    res.set('Cache-Control', 'public, max-age=86400, s-maxage=2592000');
  }
  app.render(req, res, route.page, query);
});

const runtimeOpts = {
  memory: '512MB'
};

exports.next = functions.runWith(runtimeOpts).https.onRequest((req, res) => {
  console.log('File: ' + req.originalUrl)
  return app.prepare().then(() => handler(req, res))
});
