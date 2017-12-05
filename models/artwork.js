const mongoose = require('mongoose');

const ArtworkSchema = new mongoose.Schema({
  title: String,
  description: String,
  cloudinaryURL: String,
  width: String,
  height: String,
  tags: [{}],
  createdOn: { type: Date, default: Date.now  },
  artist: String,
  firebaseId: String,
  facebookId: String,
  firebaseName: String,
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
});

const Artwork = mongoose.model('Artwork', ArtworkSchema);

module.exports = {
  Artwork: Artwork,
}
