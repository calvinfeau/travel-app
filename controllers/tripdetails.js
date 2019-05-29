var Traveler = require('../models/traveler');

module.exports = {
    newActivity,
    newSleep,
    newFood,
    createActivity,
    createFood,
    createSleep,
    deleteActivity,
    deleteFood,
    deleteSleep,
    editActivity,
    editFood,
    editSleep,
    updateActivity,
    updateFood,
    updateSleep
};

function newActivity(req, res) {
    let travelerId = req.user._id;
    let tripId = req.params.tripId
    let trip;
    Traveler.findById(travelerId, function (err, traveler) {
        traveler.previousTrips.forEach(t => {
            t._id.toString() == tripId.toString() ? trip = t : -1;
        })
        res.render('trips/activity/new', { trip })
    });
}

function newSleep(req, res) {
    let travelerId = req.user._id;
    let tripId = req.params.tripId
    let trip;
    Traveler.findById(travelerId, function (err, traveler) {
        traveler.previousTrips.forEach(t => {
            t._id.toString() == tripId.toString() ? trip = t : -1;
        })
        res.render('trips/sleep/new', { trip })
    });
}

function newFood(req, res) {
    let travelerId = req.user._id;
    let tripId = req.params.tripId
    let trip;
    Traveler.findById(travelerId, function (err, traveler) {
        traveler.previousTrips.forEach(t => {
            t._id.toString() == tripId.toString() ? trip = t : -1;
        })
        res.render('trips/food/new', { trip })
    });
}

function createActivity(req, res) {
    let travelerId = req.user._id;
    let tripId = req.params.tripId
    Traveler.findById(travelerId, function (err, traveler) {
        traveler.previousTrips.forEach((t, idx, arr) => {
            t._id.toString() == tripId.toString() ? arr[idx].activities.push(req.body) : -1;
        });
        traveler.save(function (err) {
            res.redirect(`/trips/${tripId}`)
        });
    })
}

function createFood(req, res) {
    let travelerId = req.user._id;
    let tripId = req.params.tripId
    Traveler.findById(travelerId, function (err, traveler) {
        traveler.previousTrips.forEach((t, idx, arr) => {
            t._id.toString() == tripId.toString() ? arr[idx].food.push(req.body) : -1;
        });
        traveler.save(function (err) {
            res.redirect(`/trips/${tripId}`)
        });
    })
}

function createSleep(req, res) {
    let travelerId = req.user._id;
    let tripId = req.params.tripId
    Traveler.findById(travelerId, function (err, traveler) {
        traveler.previousTrips.forEach((t, idx, arr) => {
            t._id.toString() == tripId.toString() ? arr[idx].sleep.push(req.body) : -1;
        });
        traveler.save(function (err) {
            res.redirect(`/trips/${tripId}`)
        });
    })
}

function deleteActivity(req, res) {
    let travelerId = req.user._id;
    let activityId = req.params.activityId;
    let trip;
    Traveler.findById(travelerId, function (err, traveler) {
        traveler.previousTrips.forEach((t) => {
            t.activities.forEach((a, idx, arr) => {
                if (a._id.toString() == activityId.toString()) {
                    arr.splice(idx, 1);
                    trip = t;
                }
            });
        });
        traveler.save(function (err) {
            res.redirect(`/trips/${trip._id}`)
        });
    });
}

function deleteFood(req, res) {
    let travelerId = req.user._id;
    let foodId = req.params.foodId;
    let trip;
    Traveler.findById(travelerId, function (err, traveler) {
        traveler.previousTrips.forEach((t) => {
            t.food.forEach((f, idx, arr) => {
                if (f._id.toString() == foodId.toString()) {
                    arr.splice(idx, 1);
                    trip = t;
                }
            });
        });
        traveler.save(function (err) {
            res.redirect(`/trips/${trip._id}`)
        });
    });
}

function deleteSleep(req, res) {
    let travelerId = req.user._id;
    let sleepId = req.params.sleepId;
    let trip;
    Traveler.findById(travelerId, function (err, traveler) {
        traveler.previousTrips.forEach((t) => {
            t.sleep.forEach((s, idx, arr) => {
                if (s._id.toString() == sleepId.toString()) {
                    arr.splice(idx, 1);
                    trip = t;
                }
            });
        });
        traveler.save(function (err) {
            res.redirect(`/trips/${trip._id}`)
        });
    });
}

function editActivity(req, res) {
    let travelerId = req.user._id;
    let activityId = req.params.activityId;
    let trip, activity;
    Traveler.findById(travelerId, function (err, traveler) {
        traveler.previousTrips.forEach((t) => {
            t.activities.forEach((a, idx, arr) => {
                if (a._id.toString() == activityId.toString()) {
                    trip = t;
                    activity = a;
                }
            });
        });
        res.render('trips/activity/edit', {
            trip,
            activity
        });
    });
}

function editFood(req, res) {

}

function editSleep(req, res) {

}

function updateActivity(req, res) {
    console.log(req.body);
    let travelerId = req.user._id;
    let activityId = req.params.activityId;
    let trip;
    Traveler.findById(travelerId, function(err, traveler) {
        traveler.previousTrips.forEach(t => {
            t.activities.forEach((a, idx, arr) => {
                if (a._id.toString() == activityId.toString()) {
                    req.body.activityName ? 
                    a.activityName = req.body.activityName : -1;
                    req.body.city ? 
                    a.city = req.body.city : -1;
                    req.body.country ? 
                    a.country = req.body.country : -1;
                    req.body.cost ? 
                    a.cost = req.body.cost : -1;
                    req.body.rating ? 
                    a.rating = req.body.rating : -1;
                    trip = t;
        }})})
        traveler.save(function(err) {
            res.redirect(`/trips/${trip._id}`)
        })
    });
}

function updateFood(req, res) {

}

function updateSleep(req, res) {

}