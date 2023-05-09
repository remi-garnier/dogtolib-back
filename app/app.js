const debug = require('debug')('app');
const cors = require('cors');
const express = require('express');
const router = require('./routers');
const errorHandler = require('./utils/error.handler');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(process.env.CORS_DOMAINS ?? '*'));
app.use(router);
app.use(errorHandler);

module.exports = app;
