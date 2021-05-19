const adaptRoute = require('../adapters/express-router-adapter');
const makeLoadRepositoryInfoController = require('../factories/controllers/load-repository-Info-controller-factory');

module.exports = (router) => {
  router.get('/repositories', adaptRoute(makeLoadRepositoryInfoController()));
};
