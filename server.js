/************************************
        ARTSHARE EXPRESS API
  Written and Owned by: Jesse Lewis
*************************************/

//Dependencies
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

//Setup App
const app = express();
const port = process.env.PORT || 3010;

//enable bodyparser for html or forms responses
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Use public directory to serve static files
app.use(express.static('public'));

//View Engine
app.set('views', './views');
app.set('view engine', 'ejs');

//Routes
const appRoutes  = require('./routes/index'); //link up routes file
app.get('/', appRoutes.returnHomePage);
app.post('/user', appRoutes.createNewUser);
app.get('/users', appRoutes.getAllUsers);
app.get('/artworks', appRoutes.getAllArtworks);
app.get('/user/:userid/artworks', appRoutes.getMyArtworks);
app.post('/user/:userid/artwork', appRoutes.createNewArtwork);



// RUN SERVER
app.listen(port,function(){
  console.log(`Server listening on port ${port}`);
});
