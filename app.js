require('dotenv').config();

const path = require('path');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');

const logger = require('./utils/logger.js');

const PORT = process.env.PORT || 3010;

app.use(express.static(path.resolve(__dirname, '../public')));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// CORS Configuration
app.use(cors());

app.disable('x-powered-by');

const server = app.listen(PORT, _ => {
    logger.log({
        level: 'info',
        message: `Listening on port ${server.address().port}`,
        label: 'CORE'
    });
});