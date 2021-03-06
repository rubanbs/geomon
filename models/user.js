﻿var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
    email: String,
    password: String,
    name: String,
    lon: { type: Number, default: 18.08850 },
    lat: { type: Number, default: 59.310740 },
    update: { type: Date, default: null },
    updateInterval: { type: Number, default: 30 },
    track: { type: [{ lon: { type: Number }, lat: { type: Number }, update: { type: Date } }] },
    iconType: { type: String, default: '' },
    color: { type: String, default: '#dd4814' }
});

userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);