var express = require('express');
var router = express.Router();
var tripsCtrl = require('../controllers/trips');

router.get('/menu', tripsCtrl.menu);
router.get('/new/:userId', tripsCtrl.newTrip);
router.post('/', tripsCtrl.createTrip);
router.get('/index', tripsCtrl.index);

module.exports = router;
