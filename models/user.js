const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  id: String,
  access_token: String,
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  profilePhoto: String,
  createdOn: { type: Date, default: Date.now  },
  artworkID: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null}],
});

const User = mongoose.model('User', UserSchema);

module.exports = {
  User: User,
}

