var Traveler = require('../models/traveler');

module.exports = {
    menu,
    newTrip, 
    index,
    show,
    createTrip,
    deleteTrip
};

function menu(req, res, next) {
    // Make the query object to use with Student.find based up
    // the user has submitted the search form or now
    // let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
    // Default to sorting by name
    // let sortKey = req.query.sort || 'name';
    // Traveler.find(modelQuery)
    // // .sort(sortKey)
    // .exec(function(err, traveler) {
    //   if (err) return next(err);
    //   // Passing search values, name & sortKey, for use in the EJS
    res.render('menu', { 
        traveler: req.user, 
        // user: req.user,
        // name: req.query.name, 
        // sortKey 
    });
    // });
}

function newTrip(req, res) {
    let travelerId = req.user._id;
    Traveler.findById(travelerId, function(err, traveler) {
        res.render('trips/new', {
            traveler, 
            travelerId
        });
    })
}

function createTrip(req, res) {
    let travelerId = req.user._id;
    Traveler.findById(travelerId, function(err, traveler) {
        traveler.previousTrips.push(req.body);
        traveler.save(function(err) {
            res.redirect('/trips/index')
        });
    }
)}

function index(req, res) {
    let travelerId = req.user._id;
    Traveler.findById(travelerId, function(err, traveler) {
    // traveler.previousTrips.forEach(trip => {
        res.render('trips/index', {traveler});
    });
}

function show(req, res) {
    let tripId = req.params.tripId;
    let travelerId = req.user._id;
    let trip;
    Traveler.findById(travelerId, function(err, traveler) {
        // let trip = traveler.previousTrips.find((t) => {
        //     t._id.toString() == tripId.toString()
        //     console.log(typeof(t._id.toString()), typeof(tripId.toString()));
        // });
        traveler.previousTrips.forEach(t =>{
            if (t._id.toString() == tripId.toString()){
                trip = t;
            }
        })
        res.render('trips/show', {trip});
        // console.log('trip: ', trip);
        });
}

function deleteTrip(req, res) {
    let tripId = req.params.tripId;
    let travelerId = req.user._id;
    Traveler.findById(travelerId, function(err, traveler) {
        traveler.previousTrips.forEach((t, idx, arr) =>{
            if (t._id.toString() == tripId.toString()){
                arr.splice(idx, 1);
            }
        })
        traveler.save(function(err) {
            res.redirect('/trips/index');
        });
    })
}