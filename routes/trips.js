var express = require('express');
var router = express.Router();
var tripsCtrl = require('../controllers/trips');

router.get('/menu', isLoggedIn, tripsCtrl.menu);

router.get('/new/:travelerId', isLoggedIn, tripsCtrl.newTrip);
router.post('/:travelerId', isLoggedIn, tripsCtrl.createTrip);

router.get('/index/:travelerId', isLoggedIn, tripsCtrl.index);


function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
  }


module.exports = router;
