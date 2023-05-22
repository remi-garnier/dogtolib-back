const express = require('express');
const veterinaryController = require('../controllers/veterinary.controller');
const controllerWrapper = require('../utils/controller-wrapper');
const validate = require('../middlewares/validation.middleware');
const searchVeterinarySchema = require('../validation/search-veterinary.validation');

const veterinaryRouter = express.Router();

/**
 * GET /veterinary/search
 * @typedef {object} veterinary
 * @tags Veterinary
 * @summary Recherche les vétérinaires correspondant aux critères fournis
 * @param {string} query.name - optionnel nom du vétérinaire
 * @param {string} query.city - optionnel ville du vétérinaire
 * @return {[veterinary]} 200 - Une liste de vétérinaires
 */
veterinaryRouter.get('/search', validate(searchVeterinarySchema, 'query'), controllerWrapper(veterinaryController.searchVeterinary));

module.exports = veterinaryRouter;
