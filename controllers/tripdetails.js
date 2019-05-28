var Traveler = require('../models/traveler');

module.exports = {
    newActivity,
    newSleep,
    newFood,
    createActivity,
    createFood,
    createSleep
};

function newActivity(req, res) {
    let travelerId = req.user._id;
    let tripId = req.params.tripId
    let trip;
    Traveler.findById(travelerId, function (err, traveler) {
        traveler.previousTrips.forEach(t => {
            if (t._id.toString() == tripId.toString()) {
                trip = t;
            }
        })
        res.render('trips/activity/new', { trip })
    });
}

function newSleep(req, res) {

}

function newFood(req, res) {

}

function createActivity(req, res) {
    // console.log(req.body);
    let travelerId = req.user._id;
    let tripId = req.params.tripId
    // console.log(tripId);
    let trip;
    Traveler.findById(travelerId, function (err, traveler) {
        traveler.previousTrips.forEach((t, idx) => {
            if (t._id.toString() == tripId.toString()) {
                trip = t;
                // console.log('traveler :', traveler);
                // console.log('trip: ', trip)
              
                traveler.previousTrips[idx].activities.push(req.body)
                // t.activities.push(req.body);
                // console.log(t);
            }
        })
        traveler.save(function (err) {
            // console.log(traveler.previousTrips[trip].activities)
            res.redirect(`/trips/${tripId}`)
        })
    })
}

function createFood(req, res) {

}

function createSleep(req, res) {

}