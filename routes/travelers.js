var express = require('express');
var router = express.Router();
var travelersCtrl = require('../controllers/travelers');

router.get('/menu', travelersCtrl.index);

module.exports = router;
