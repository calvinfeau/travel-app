var Traveler = require('../models/traveler');

module.exports = {
    menu,
    newTrip, 
    index,
    createTrip
};

function menu(req, res, next) {
    // Make the query object to use with Student.find based up
    // the user has submitted the search form or now
    let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
    // Default to sorting by name
    let sortKey = req.query.sort || 'name';
    Traveler.find(modelQuery)
    .sort(sortKey).exec(function(err, travelers) {
      if (err) return next(err);
      // Passing search values, name & sortKey, for use in the EJS
      res.render('menu', { 
        travelers, 
        user: req.user,
        name: req.query.name, 
        sortKey 
        });
    });
}

function newTrip(req, res) {
    // console.log('newtrip reached');
    Traveler.findById(req.params.userId, function(err, traveler) {
        console.log('traveler:', traveler);
        res.render('trips/new', {traveler});
    })
}

function createTrip(req, res) {
    console.log('req.body:', req.body);
    res.render('trips/new', {traveler})
}

function index(req, res) {
    console.log('trip list reached');
    
    res.render('trips/index');
}