var mongoose = require('mongoose');

var reservedSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    done: Boolean,
    day: Date,
    cost: Number
});

var upcomingTripSchema = new mongoose.Schema({
    tripName: {
        type: String,
        required: true
    },
    reserved: [reservedSchema],
    budget: Number,
    startDate: Date,
    endDate: Date,
    comments: String
});

var activitySchema = new mongoose.Schema({
    activityName: {
        type: String,
        required: true,
    },
    city: String,
    country: String,
    startDate: Date,
    endDate: Date,
    cost: Number,
    rating: {
        type: Number,
        min: 0,
        max: 5
    }   
});

var foodSchema = new mongoose.Schema({
    foodSpot: {
        type: String,
        required: true,
    },
    city: String,
    country: String,
    day: Date,
    cost: Number,
    rating: {
        type: Number,
        min: 0,
        max: 5
    }   
});

var sleepSchema = new mongoose.Schema({
    placeName: {
        type: String,
        required: true,
    },
    city: String,
    country: String,
    startDate: Date,
    endDate: Date,
    cost: Number,
    rating: {
        type: Number,
        min: 0,
        max: 5
    }
});

var previousTripSchema = new mongoose.Schema({
    tripName: {
        type: String,
        required: true
    },
    activities: [activitySchema],
    food: [foodSchema],
    sleep: [sleepSchema]
});

var travelerSchema = new mongoose.Schema({
    name: String,
    googleId: String,
    previousTrips: [previousTripSchema],
    upcomingTrips: [upcomingTripSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('Traveler', travelerSchema);