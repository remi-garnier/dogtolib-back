const express = require('express');
const veterinaryController = require('../controllers/veterinary.controller');
const controllerWrapper = require('../utils/controller-wrapper');
const validate = require('../middlewares/validation.middleware');
const searchVeterinarySchema = require('../validation/search-veterinary.validation');

const veterinaryRouter = express.Router();

veterinaryRouter.get('/search', validate(searchVeterinarySchema, 'query'), controllerWrapper(veterinaryController.searchVeterinary));

module.exports = veterinaryRouter;
