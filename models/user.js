const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  id: String,
  access_token: String,
  firstName: String,
  lastName: String,
  displayName: String,
  email: { type: String, unique: true },
  facebookId: String,
  firebaseId: String,
  access_token: String,
  profilePhoto: String,
  createdOn: { type: Date, default: Date.now  },
  artworks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Artwork', default: null}],
});

const User = mongoose.model('User', UserSchema);

module.exports = {
  User: User,
}

