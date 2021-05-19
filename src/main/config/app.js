const express = require('express');
const cors = require('cors');

const setupRoutes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());

setupRoutes(app);

module.exports = app;
