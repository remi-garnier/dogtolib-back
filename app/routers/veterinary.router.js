const express = require('express');
const veterinaryController = require('../controllers/veterinary.controller');
const controllerWrapper = require('../utils/controller-wrapper');

const veterinaryRouter = express.Router();

veterinaryRouter.get('/search', controllerWrapper(veterinaryController.searchVeterinary));

module.exports = veterinaryRouter;
