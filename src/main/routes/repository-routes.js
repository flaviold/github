const adaptRoute = require('../adapters/express-router-adapter');
const makeLoadRepositoryInfoController = require('../factories/controllers/load-repository-Info-controller-factory');
const cacheMiddleware = require('../middlewares/cache-middleware');
const env = require('../config/env');

module.exports = (router) => {
  router.get('/repositories', cacheMiddleware(env.CACHE_DURATION), adaptRoute(makeLoadRepositoryInfoController()));
};
