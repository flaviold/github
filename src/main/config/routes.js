const express = require('express');
const { serve, setup } = require('swagger-ui-express');

const swaggerDoc = require('../docs/swagger');
const setupRepositoryRoutes = require('../routes/repository-routes');

module.exports = (app) => {
  const router = express.Router();
  app.use('/api-docs', serve, setup(swaggerDoc));
  app.use('/api', router);

  setupRepositoryRoutes(router);
};
