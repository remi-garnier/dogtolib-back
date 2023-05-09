const debug = require('debug')('app');
const cors = require('cors');
const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(process.env.CORS_DOMAINS ?? '*'));

module.exports = app;
