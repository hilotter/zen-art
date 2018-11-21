const routes = require('next-routes')();

routes
  .add('/', 'index')
  .add('/privacy', 'privacy')
  .add('/about', 'about')
  .add('/publish', 'publish')
  .add('/detail/:tokenId', 'detail');

module.exports = routes;
