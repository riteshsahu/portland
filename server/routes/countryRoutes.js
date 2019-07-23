const express = require('express');
const countryRoutes = express.Router(); 
const CountryController = require('../controller/CountryController');

countryRoutes.get('/', CountryController.getCountries);
countryRoutes.get('/:countryId/state', CountryController.getStates);


module.exports =  countryRoutes;