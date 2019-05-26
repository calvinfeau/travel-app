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
    // .sort(sortKey)
    .exec(function(err, traveler) {
      if (err) return next(err);
      // Passing search values, name & sortKey, for use in the EJS
      res.render('menu', { 
        traveler: req.user, 
        // user: req.user,
        // name: req.query.name, 
        // sortKey 
        });
    });
}

function newTrip(req, res) {
    let travelerId = req.params.travelerId;
    Traveler.findById(travelerId, function(err, traveler) {
        res.render('trips/new', {
            traveler, 
            travelerId
        });
    })
}

function createTrip(req, res) {
    let travelerId = req.params.travelerId;
    Traveler.findById(travelerId, function(err, traveler) {
        traveler.previousTrips.push(req.body);
        traveler.save(function(err) {
            res.redirect(`/trips/index/${travelerId}`)
        })}
)}

function index(req, res) {
    let travelerId = req.params.travelerId;
    Traveler.findById(travelerId, function(err, traveler) {
        res.render('trips/index', {traveler});
    });
}