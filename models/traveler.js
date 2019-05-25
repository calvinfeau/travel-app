var mongoose = require('mongoose');

// var upcomingTripSchema = new mongoose.Schema({})

var activitySchema = new mongoose.Schema({
    activtyName: {
        type: String,
        required: true,
    },
    city: String,
    country: String,
    // date: Date,
    // endDate: Date,
    cost: Number,
    rating: Number,
    // photo: Image
});

var foodSchema = new mongoose.Schema({
    foodSpot: {
        type: String,
        required: true,
    },
    city: String,
    country: String,
    // date: Date,
    // endDate: Date,
    cost: Number,
    rating: Number,
    // photo: Image
});

var sleepSchema = new mongoose.Schema({
    placeName: {
        type: String,
        required: true,
    },
    city: String,
    country: String,
    // date: Date,
    // endDate: Date,
    cost: Number,
    rating: Number,
    // photo: Image
});

var previousTripSchema = new mongoose.Schema({
    tripName: {
        type: String,
        required: true
    },
    activities: [activitySchema],
    foodPlaces: [foodSchema],
    sleepPlaces: [sleepSchema]
});

var travelerSchema = new mongoose.Schema({
    name: String,
    googleId: String,
    previousTrip: [previousTripSchema],
    // upcomingTrip: [upcomingTripSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('Traveler', travelerSchema);