// models/Song.js

const mongoose = require('mongoose');

// Check if the Song model is already registered with mongoose
const SongModel = mongoose.models.Song || mongoose.model('Song', new mongoose.Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    album: { type: String },
    genre: { type: String }
    // Add other song properties as needed
}));

module.exports = SongModel;
