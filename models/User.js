const { model, Schema } = require('mongoose');

//TODO
const userSchema = new Schema({
    email: { type: String, required: true, unique: true, minLength: [5, 'Email must be at least 5 characters long'] },
    username: { type: String, required: true, unique: true, minLength: [5, 'Username must be at least 5 characters long'] },
    hashedPassword: { type: String, required: true }
});

userSchema.index({ username: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('user', userSchema);

module.exports = User;