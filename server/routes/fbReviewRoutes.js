const express = require('express');
const fbReviewRoutes = express.Router(); 
const FbReviewController = require('../controller/fbReviewController');
fbReviewRoutes.get('/', FbReviewController.getFbReview);

module.exports =  fbReviewRoutes;