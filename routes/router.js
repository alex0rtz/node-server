const express = require('express');
const app = express();

const core = require('./core/index')

/**
 * CORE
 */
app.use('/api/v1/core', core);

module.exports = app;