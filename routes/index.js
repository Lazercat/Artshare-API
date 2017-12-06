/* ARTSHARE API ROUTING
**************************/

const db = require('../models');
const user = require('../models/user');
const mongoose = require('mongoose');


function returnHomePage(req, res) {
 res.render('home');
}


function getAllUsers(req, res) {
   db.User.find({}, function(err, data) {
    if(err) {
      console.log('Error retrieving all users');
      res.status(500).send('Internal Server Error');
    } else {
      res.status(201).json(data);;
    }
  });
}

function getThisUser(req, res) {
   db.User.find({ facebookId: req.params.facebkid}, function(err, data) {
    if(err) {
      console.log('Error retrieving all users');
      res.status(500).send('Internal Server Error');
    } else {
      console.log('found user!')
      res.status(201).json(data);;
    }
  });
}

function getThisFirebaseUser(req, res) {
   db.User.find({ firebaseId: req.params.firebsid}, function(err, data) {
    if(err) {
      console.log('Error retrieving firebase user');
      res.status(500).send('Internal Server Error');
    } else {
      console.log('found user!')
      res.status(201).json(data);;
    }
  });
}

function createNewUser(req, res) {
  const newUser = db.User({
    id: req.body.id,
    access_token: req.body.access_token,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    displayName: req.body.displayName,
    email: req.body.email,
    facebookId: req.body.facebookId,
    firebaseId: req.body.firebaseId,
    profilePhoto: req.body.profilePhoto,
  });
  newUser.save(function(err,data) {
    if(err) {
      res.status(500).send('internal server error for new user.');
    } else {
      res.status(201).json(data);
    }
  });
}





function getAllArtworks(req, res){
   db.Artwork.find({}, function(err, data) {
    if(err) {
      console.log('Error retrieving artworks');
      res.status(500).send('Internal Server Error');
    } else {
      res.status(201).json(data);
    }
  });
}


function getArtwork(req, res) {
   db.Artwork.find({_id: req.params.artid}, function(err, data) {
    if(err) {
      console.log('Error retrieving artwork');
      res.status(500).send('Internal Server Error getting artwork' + req.params.artid);
    } else {
      res.status(201).json(data);
    }
  });
}

function getMyArtworks(req, res) {
   db.Artwork.find({firebaseId: req.params.userid}, function(err, data) {
    if(err) {
      console.log('Error retrieving  user\'s artworks');
      res.status(500).send('Internal Server Error');
    } else {
      res.status(201).json(data);
    }
  });
}

function getMyTagArtworks (req,res){
   console.log('searching with '+req.params.tagid)

   db.Artwork.find({  tags: 'cool, tug, war, oil, paint, abstract'} , function(err, data) {
    if(err) {
      console.log('Error retrieving  tagged\'s artwork for '+req.params.tagid);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('i got this..' +data);
      res.status(201).json(data);
    }
  });
}


function createNewArtwork(req, res) {
   const newArt = db.Artwork({
      title: req.body.title,
      artist: req.body.artist,
      tags: req.body.tags,
      description: req.body.description,
      cloudinaryURL: req.body.cloudinaryURL,
      width: req.body.width,
      height: req.body.height,
      facebookId: req.body.facebookId,
      firebaseId: req.body.firebaseId,
      firebaseName: req.body.artist,
    });
    newArt.save(function(err,data) {
      if(err) {
        res.status(500).send('internal server error for newArt.' + err);
      } else {
        res.status(201).json(data);
        console.log(data);
      }
    });
}


/* EXPORT FUNCTIONS
*********************/
module.exports = {
  returnHomePage: returnHomePage,
  getAllUsers: getAllUsers,
  getThisUser: getThisUser,
  getThisFirebaseUser: getThisFirebaseUser,
  getAllArtworks: getAllArtworks,
  getMyArtworks: getMyArtworks,
  createNewArtwork: createNewArtwork,
  createNewUser: createNewUser,
  getArtwork: getArtwork,
  getMyTagArtworks: getMyTagArtworks,
}

