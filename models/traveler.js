var mongoose = require('mongoose');

var travelSchema = new mongoose.Schema({
    name: String,
    googleId: String,
    // previousTrip: [previousTripSchema],
    // upcomingTrip: [upcomingTripSchema]
}, {
    timestamps: true
})

module.exports = mongoose.model('Traveler', travelSchema);