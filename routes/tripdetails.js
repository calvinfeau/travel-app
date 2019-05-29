var express = require('express');
var router = express.Router();
var tripdetailsCtrl = require('../controllers/tripdetails');

router.get('/activity/:tripId', isLoggedIn, tripdetailsCtrl.newActivity);
router.get('/food/:tripId', isLoggedIn, tripdetailsCtrl.newFood);
router.get('/sleep/:tripId', isLoggedIn, tripdetailsCtrl.newSleep);

router.post('/activity/:tripId', isLoggedIn, tripdetailsCtrl.createActivity);
router.post('/food/:tripId', isLoggedIn, tripdetailsCtrl.createFood);
router.post('/sleep/:tripId', isLoggedIn, tripdetailsCtrl.createSleep);

router.delete('/activity/:activityId', isLoggedIn, tripdetailsCtrl.deleteActivity);
router.delete('/food/:foodId', isLoggedIn, tripdetailsCtrl.deleteFood);
router.delete('/sleep/:sleepId', isLoggedIn, tripdetailsCtrl.deleteSleep);

router.get('/activity/:activityId/edit', isLoggedIn, tripdetailsCtrl.editActivity);
router.get('/food/:foodId/edit', isLoggedIn, tripdetailsCtrl.editFood);
router.get('/sleep/:sleepId/edit', isLoggedIn, tripdetailsCtrl.editSleep);

router.put('/activity/:activityId', isLoggedIn, tripdetailsCtrl.updateActivity);
router.put('/food/:foodId', isLoggedIn, tripdetailsCtrl.updateFood);
router.put('/sleep/:sleepId', isLoggedIn, tripdetailsCtrl.updateSleep);

function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
  }

module.exports = router;