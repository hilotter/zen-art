const routes = require('next-routes')();

routes
  .add('/detail/:tokenId', 'detail');

module.exports = routes;
