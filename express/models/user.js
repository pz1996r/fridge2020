// local ******************************************************************************************************
const dotenv = require('dotenv');
dotenv.config();
// end local ****************************************************************************************************
const jwt = require('jsonwebtoken');
// const config = require('config');
const Joi = require('joi');
const mongoose = require('mongoose');

const { jwtPrivateKey, db } = process.env;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        unique: true
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024,
    }
})

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, jwtPrivateKey)
    return token;
}

const User = mongoose.model('User', userSchema)

function validateUser(user) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    }

    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;