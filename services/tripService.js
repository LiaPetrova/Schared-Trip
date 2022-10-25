const Trip = require("../models/Trip");
const User = require("../models/User");

async function getAll () {
    return Trip.find({}).lean();
}

async function getById (id) {
    return Trip.findById(id).populate('owner').lean();
}

async function createTrip (tripData, userId) {
    const trip = await Trip.create(tripData);
    
    const user = await User.findById(userId);
    user.trips.push(trip._id);
    user.tripsCount++;
    await user.save();

}

async function editTrip (tripId, trip) {
    const existing =  await Trip.findById(tripId);

    existing.start = trip.start;
    existing.end = trip.end;
    existing.date = trip.date;
    existing.time = trip.time;
    existing.imageUrl = trip.imageUrl;
    existing.price = trip.price;
    existing.carBrand = trip.carBrand;
    existing.description = trip.description;
    existing.seats = trip.seats;

    await existing.save();
}

async function joinTrip (tripId, userEmail) {
    const trip = await Trip.findById(tripId);

    trip.buddies.push(userEmail);
    trip.seats--;

    await trip.save();
}

async function deleteTrip (id) {
    return Trip.findByIdAndRemove(id);
}

module.exports = {
    getAll,
    getById,
    createTrip,
    joinTrip,
    editTrip,
    deleteTrip
};