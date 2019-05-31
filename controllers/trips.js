var Traveler = require('../models/traveler');

module.exports = {
    menu,
    newTrip, 
    index,
    show,
    createTrip,
    deleteTrip
};

function menu(req, res) {
    res.render('menu', { traveler: req.user });
}

function newTrip(req, res) {
    let travelerId = req.user._id;
    Traveler.findById(travelerId, function(err, traveler) {
        err ? 
        res.render('trips/index')
        : 
        res.render('trips/new', {
            traveler, 
            travelerId
        });
    });
}

function createTrip(req, res) {
    console.log(req.body.trip);
    let travelerId = req.user._id;
    Traveler.findById(travelerId, function(err, traveler) {
        err ? 
        res.render('trips/index')
        : 
        req.body.trip == 'upcoming' ? 
        (traveler.upcomingTrips.push(req.body),
        traveler.save(function(err) {
            err ? 
            res.render('trips/index', {traveler})
            :
            res.redirect('/comingtrips/index')
        })) :  
        (traveler.previousTrips.push(req.body),
        traveler.save(function(err) {
            err ? 
            res.render('trips/index', {traveler})
            :
            res.redirect('/trips/index')
        }));
    });
}

function index(req, res) {
    let travelerId = req.user._id;
    Traveler.findById(travelerId, function(err, traveler) {
        err ? 
        res.render('trips/menu')
        : 
        res.render('trips/index', { traveler });
    });
}

function show(req, res) {
    let tripId = req.params.tripId;
    let travelerId = req.user._id;
    let trip;
    Traveler.findById(travelerId, function(err, traveler) {
        err ? 
        res.render('trips/index')
        : 
        (traveler.previousTrips.forEach(t => {
            t._id.toString() == tripId.toString() ? trip = t : -1;
        }),
        res.render('trips/show', { trip }));
    });
}

function deleteTrip(req, res) {
    let tripId = req.params.tripId;
    let travelerId = req.user._id;
    Traveler.findById(travelerId, function(err, traveler) {
        err ? 
        res.render('trips/index')
        : 
        (traveler.previousTrips.forEach((t, idx, arr) => {
            t._id.toString() == tripId.toString() ? arr.splice(idx, 1) : -1;
        }),
        traveler.save(function(err) {
            res.redirect('/trips/index');
        }));
    });
}