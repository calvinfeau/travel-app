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
        traveler.previousTrips.forEach(t => {
            t.activities.forEach(a => {
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
    let travelerId = req.user._id;
    let foodId = req.params.foodId;
    let trip, food;
    Traveler.findById(travelerId, function (err, traveler) {
        traveler.previousTrips.forEach(t => {
            t.food.forEach(f => {
                if (f._id.toString() == foodId.toString()) {
                    trip = t;
                    food = f;
                }
            });
        });
        res.render('trips/food/edit', {
            trip,
            food
        });
    });
}

function editSleep(req, res) {
    let travelerId = req.user._id;
    let sleepId = req.params.sleepId;
    let trip, sleep;
    Traveler.findById(travelerId, function (err, traveler) {
        traveler.previousTrips.forEach(t => {
            t.sleep.forEach(s => {
                if (s._id.toString() == sleepId.toString()) {
                    trip = t;
                    sleep = s;
                }
            });
        });
        res.render('trips/sleep/edit', {
            trip,
            sleep
        });
    });
}

function updateActivity(req, res) {
    let travelerId = req.user._id;
    let activityId = req.params.activityId;
    let trip;
    Traveler.findById(travelerId, function(err, traveler) {
        traveler.previousTrips.forEach(t => {
            t.activities.forEach((a, idx, arr) => {
                a._id.toString() == activityId.toString() ?
                    (req.body.activityName ? 
                    a.activityName = req.body.activityName : -1,
                    req.body.city ? 
                    a.city = req.body.city : -1,
                    req.body.country ? 
                    a.country = req.body.country : -1,
                    req.body.cost ? 
                    a.cost = req.body.cost : -1,
                    req.body.rating ? 
                    a.rating = req.body.rating : -1,
                    trip = t)
                : -1;
            });
        });
        traveler.save(function(err) {
            res.redirect(`/trips/${trip._id}`)
        });
    });
}

function updateFood(req, res) {
    let travelerId = req.user._id;
    let foodId = req.params.foodId;
    let trip;
    Traveler.findById(travelerId, function(err, traveler) {
        traveler.previousTrips.forEach(t => {
            t.food.forEach(f => {
                f._id.toString() == foodId.toString() ? 
                    (req.body.foodSpot ? 
                    f.foodSpot = req.body.foodSpot : -1,
                    req.body.city ? 
                    f.city = req.body.city : -1,
                    req.body.country ? 
                    f.country = req.body.country : -1,
                    req.body.cost ? 
                    f.cost = req.body.cost : -1,
                    req.body.rating ? 
                    f.rating = req.body.rating : -1,
                    trip = t) 
                : -1;
            });
        });
        traveler.save(function(err) {
            res.redirect(`/trips/${trip._id}`)
        });
    });
}

function updateSleep(req, res) {
    let travelerId = req.user._id;
    let sleepId = req.params.sleepId;
    let trip;
    Traveler.findById(travelerId, function(err, traveler) {
        traveler.previousTrips.forEach(t => {
            t.sleep.forEach(s => {
                s._id.toString() == sleepId.toString() ? 
                    (req.body.placeName ? 
                    s.placeName = req.body.placeName : -1,
                    req.body.city ? 
                    s.city = req.body.city : -1,
                    req.body.country ? 
                    s.country = req.body.country : -1,
                    req.body.cost ? 
                    s.cost = req.body.cost : -1,
                    req.body.rating ? 
                    s.rating = req.body.rating : -1,
                    trip = t) 
                : -1;
            });
        });
        traveler.save(function(err) {
            res.redirect(`/trips/${trip._id}`)
        });
    });
}