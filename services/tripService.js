const Trip = require("../models/Trip");
const User = require("../models/User");

async function getAll () {
    return Trip.find({}).lean();
}

async function getById (id) {
    return Trip.findById(id).populate('owner').lean();
}

async function createTrip (trip, userId) {
    const user = await User.findById(userId);
    user.trips.push(trip._id);
    await user.save();

   return Trip.create(trip);
}

async function joinTrip (tripId, userEmail) {
    const trip = await Trip.findById(tripId);

    trip.buddies.push(userEmail);
    trip.seats--;

    await trip.save();
}
module.exports = {
    getAll,
    getById,
    createTrip,
    joinTrip
};