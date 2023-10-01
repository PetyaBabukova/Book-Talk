const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        minlength: 4
    },

    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 3,
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
        minlength: 10,
    }
});

userSchema.virtual('repeatPassword')
    .set(function (value) {
        if (this.password !== value) {
            throw new Error('Password missmatch')
        }
    });

//hash password
userSchema.pre('save', async function () {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash
});

const User = mongoose.model('User', userSchema);

module.exports = User;