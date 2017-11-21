const mongoose = require('mongoose');

const ArtworkSchema = new mongoose.Schema({
  title: String,
  description: String,
  cloudinaryURL: String,
  width: String,
  height: String,
  createdOn: { type: Date, default: Date.now  },
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'ApiUserAccount'},
});

const Artwork = mongoose.model('Artwork', ArtworkSchema);

module.exports = {
  Artwork: Artwork,
}