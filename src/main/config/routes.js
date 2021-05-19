const express = require('express');

const setupRepositoryRoutes = require('../routes/repository-routes');

module.exports = (app) => {
  const router = express.Router();
  app.use(router);

  setupRepositoryRoutes(router);
};
