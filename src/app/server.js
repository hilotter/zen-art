const next = require('next');
const { createServer } = require('http');
const routes = require('./routes');

const app = next({
  dev: process.env.NODE_ENV !== 'production',
});

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

app.prepare().then(() => {
  createServer(handler).listen(3000, (err) => {
    if (err) throw err;
    console.log('Ready on localhost:3000');
  });
});
