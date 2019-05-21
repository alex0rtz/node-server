require('dotenv').config();

const path = require('path');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');

const logger = require('./utils/logger.js');

const PORT = process.env.PORT || 3010;

app.use(express.static(path.resolve(__dirname, './public')));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// CORS Configuration
if (process.env.NODE_ENV !== 'dev') {
    const WHITELIST = ['http://localhost/'];

    const corsOptions = (req, callback) => {
        if (!!WHITELIST.includes(req.header('Origin'))) {
            callback(null, true);
        } else {
            logger.log({
                level: 'error',
                message: 'Not allowed by CORS',
                label: 'SECURITY'
            });

            callback(new Error('Not allowed by CORS'));
        }
    };

    app.use(cors(corsOptions));

} else {
    app.use(cors());
}

app.disable('x-powered-by');

app.use(require('./routes/router'));

const server = app.listen(PORT, _ => {
    logger.log({
        level: 'info',
        message: `Listening on port ${server.address().port}`,
        label: 'CORE'
    });
});