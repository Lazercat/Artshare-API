const mongoose = require('mongoose');
require('dotenv').config();  //need dot env because we connect db down here

//ADD ALL MODELS HERE
const userModels = require('./user');
const artworkModels = require('./artwork');

//FIX PROMISE BUG
mongoose.Promise = global.Promise;

//MONGODB CONNECT
mongoose.connection.openUri(process.env.MONGODB_URI || process.env.DB_CONN, {}, function(err, conn) {
  if (err) {
    console.log('Error connecting to Mongo DB.', err);
  } else {
    console.log('Mongoose successfully connected to Mongo DB.');
  }
});

//EXPORT ALL MODELS HERE
module.exports = {
  User: userModels.User,
  Artwork: artworkModels.Artwork
};
