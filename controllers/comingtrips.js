var Traveler = require('../models/traveler');

module.exports = {
    index,
    deleteTrip,
    show,
    newTripDetails,
    createTripDetails,
    create,
    edit,
    update,
    deleteDetail
};


function createTripDetails(req, res) {
    let travelerId = req.user._id;
    let tripId = req.params.tripId
    Traveler.findById(travelerId, function (err, traveler) {
        traveler.upcomingTrips.forEach((t, idx, arr) => {
            t._id.toString() == tripId.toString() ? arr[idx].reserved.push(req.body) : -1;
        });
        traveler.save(function (err) {
            res.redirect(`/comingtrips/${tripId}`)
        });
    })
}
function deleteTrip(req, res) {
    tripId = req.params.tripId;
    let travelerId = req.user._id;
    Traveler.findById(travelerId, function(err, traveler) {
        err ? 
        res.render('menu') 
        :
        (traveler.upcomingTrips.forEach((t, idx, arr) => {
            t._id.toString() == tripId.toString() ? arr.splice(idx, 1) : -1;
        }),
        traveler.save(function(err) {
            res.redirect('/comingtrips/index');
        }));
    })
}

function index(req, res) {
    let travelerId = req.user._id;
    Traveler.findById(travelerId, function(err, traveler) {
        err ?
        res.render('menu')
        :
        res.render('comingtrips/index', {traveler})
    })
}

function show(req, res) {
    let tripId = req.params.tripId;
    let travelerId = req.user._id;
    let trip;
    Traveler.findById(travelerId, function(err, traveler) {
        err ? 
        res.render('trips/index')
        : 
        (traveler.upcomingTrips.forEach(t => {
            t._id.toString() == tripId.toString() ? trip = t : -1;
        }),
        res.render('comingtrips/show', { trip }));
    });
}

function newTripDetails(req, res) {
    let travelerId = req.user._id;
    let tripId = req.params.tripId
    let trip;
    Traveler.findById(travelerId, function (err, traveler) {
        traveler.upcomingTrips.forEach(t => {
            t._id.toString() == tripId.toString() ? trip = t : -1;
        })
        res.render('comingtrips/new', { trip })
    });
}

function create(req, res) {
    let travelerId = req.user._id;
    let tripId = req.params.tripId;
    Traveler.findById(travelerId, function(err, traveler) {
        traveler.upcomingTrips.forEach(t => {
            t._id.toString() == tripId.toString() ? 
                (req.body.tripName ? 
                t.tripName = req.body.tripName : -1,
                req.body.budget ? 
                t.budget = req.body.budget : -1,
                req.body.startDate ? 
                t.startDate = req.body.startDate : -1,
                req.body.endDate ? 
                t.endDate = req.body.endDate : -1,
                req.body.comments ? 
                t.comments = req.body.comments : -1,
                trip = t)
                : -1;
            });
        traveler.save(function(err) {
            res.redirect(`/comingtrips/${tripId}`);
        })
    })
}

function edit(req, res) {
    let travelerId = req.user._id;
    let detailId = req.params.detailId;
    let trip, reserve;
    Traveler.findById(travelerId, function (err, traveler) {
        traveler.upcomingTrips.forEach(t => {
            t.reserved.forEach(r => {
                if (r._id.toString() == detailId.toString()) {
                    trip = t;
                    reserve = r;
                }
            });
        });
        res.render('comingtrips/edit', {
            trip,
            reserve
        });
    });
}

function update(req, res) {
    let travelerId = req.user._id;
    let detailId = req.params.detailId;
    let trip;
    Traveler.findById(travelerId, function(err, traveler) {
        traveler.upcomingTrips.forEach(t => {
            t.reserved.forEach((r) => {
                r._id.toString() == detailId.toString() ?
                    (req.body.name ? 
                    r.name = req.body.name : -1,
                    req.body.cost ? 
                    r.cost = req.body.cost : -1,
                    req.body.day ? 
                    r.day = req.body.day : -1,
                    trip = t)
                : -1;
            });
        });
        traveler.save(function(err) {
            res.redirect(`/comingtrips/${trip._id}`)
        });
    });
}

function deleteDetail(req, res) {
    let travelerId = req.user._id;
    let detailId = req.params.detailId;
    let trip;
    Traveler.findById(travelerId, function (err, traveler) {
        traveler.upcomingTrips.forEach((t) => {
            t.reserved.forEach((r, idx, arr) => {
                if (r._id.toString() == detailId.toString()) {
                    arr.splice(idx, 1);
                    trip = t;
                }
            });
        });
        traveler.save(function (err) {
            res.redirect(`/comingtrips/${trip._id}`)
        });
    });
}