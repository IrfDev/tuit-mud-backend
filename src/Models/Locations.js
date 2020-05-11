const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    country: String,
    name: String,
})