const { model, Schema, Types } = require('mongoose');

const EMAIL_PATTERN = /^\w+@[a-zA-z1-9]+\.[a-zA-Z]+$/i;
//TODO
const userSchema = new Schema({
    email: { type: String, validate: {
        validator: (value) => (EMAIL_PATTERN.test(value)),
        message: 'Invalid Email' 
    }},
    gender: { type: String, enum: ['male', 'female']},
    trips: { type: [Types.ObjectId], default: [], ref: 'Trip'},
    hashedPassword: { type: String, required: true }
});

userSchema.index({ email : 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = User;