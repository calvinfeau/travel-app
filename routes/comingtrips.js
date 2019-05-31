var express = require('express');
var router = express.Router();
var comingtripsCtrl = require('../controllers/comingtrips');

router.get('/index', isLoggedIn, comingtripsCtrl.index);
router.get('/:tripId', isLoggedIn, comingtripsCtrl.show);
router.post('/:tripId', isLoggedIn, comingtripsCtrl.create);
router.delete('/trip/:tripId', isLoggedIn, comingtripsCtrl.deleteTrip);

router.get('/new/:tripId', isLoggedIn, comingtripsCtrl.newTripDetails);
router.get('/:detailId/edit', isLoggedIn, comingtripsCtrl.edit);
router.post('/detail/:tripId', isLoggedIn, comingtripsCtrl.createTripDetails);
router.put('/:detailId', isLoggedIn, comingtripsCtrl.update);
router.delete('/:detailId', isLoggedIn, comingtripsCtrl.deleteDetail);

function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
  }

module.exports = router;