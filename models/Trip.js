const { model, Schema, Types } = require('mongoose');

const URL_PATTERN = /^https?:\/\/.+$/i;

const tripSchema = new Schema({
    start: { type: String, minLength: [4, 'Start point must be at least 4 characters long']},
    end: { type: String, minLength: [4, 'End point must be at least 4 characters long']},
    date: { type: String, required: true },
    time: { type: String, required: true },
    imageUrl: { type: String,  validate: {
        validator: (value) => (URL_PATTERN.test(value)),
        message: 'Invalid URL' 
    }},
    carBrand: { type: String, minLength: [4, 'Car brand must be at least 4 characters long'] },
    seats: { type: Number, min: [0, 'Seats count should be a positive number'], max: [4, 'Seats count can be macimum 4 seats']},
    price: { type: Number, min: [1, 'Price should be a positive number'], max: [50, 'Price cannot be higher than 50']},
    description: { type: String, minLength: [10, 'Description must be at least 10 characters long']},
    owner: { type: Types.ObjectId, ref: 'User', required: true},
    buddies: { type: [String], default: []}
});

const Trip = model('Trip', tripSchema);

module.exports = Trip;
