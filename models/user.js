const mongoose = require('mongoose');

const ApiUserAccountSchema = new mongoose.Schema({
  id: String,
  access_token: String,
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  profilePhoto: String,
  createdOn: { type: Date, default: Date.now  },
  existAccountId: { type: mongoose.Schema.Types.ObjectId, ref: 'ExistUserAccount', default: null},
});

const ApiUserAccount = mongoose.model('ApiUserAccount', ApiUserAccountSchema); // eventual main user library

module.exports = {
  ApiUserAccount: ApiUserAccount,
}

