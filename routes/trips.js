var express = require('express');
var router = express.Router();
var tripsCtrl = require('../controllers/trips');

router.get('/menu', isLoggedIn, tripsCtrl.menu);
router.get('/new', isLoggedIn, tripsCtrl.newTrip);
router.get('/index', isLoggedIn, tripsCtrl.index);
router.get('/:tripId', isLoggedIn, tripsCtrl.show);
router.post('/', isLoggedIn, tripsCtrl.createTrip);

function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
  }


module.exports = router;
