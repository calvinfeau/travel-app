var express = require('express');
var router = express.Router();
var tripdetailsCtrl = require('../controllers/tripdetails');

router.get('/activity/:tripId', isLoggedIn, tripdetailsCtrl.newActivity);
router.get('/food', isLoggedIn, tripdetailsCtrl.newFood);
router.get('/sleep', isLoggedIn, tripdetailsCtrl.newSleep);

router.post('/:tripId', isLoggedIn, tripdetailsCtrl.createActivity);
router.post('/', isLoggedIn, tripdetailsCtrl.createFood);
router.post('/', isLoggedIn, tripdetailsCtrl.createSleep);

function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
  }

module.exports = router;