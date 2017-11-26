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
const port = process.env.PORT || 3001;

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', process.env.REACT_HOST_URL);
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', false);

    // Pass to next layer of middleware
    next();
});


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
app.get('/users', appRoutes.getAllUsers);
app.get('/artworks', appRoutes.getAllArtworks);
app.get('/artwork/:artid', appRoutes.getArtwork);
app.get('/user/:userid/artworks', appRoutes.getMyArtworks);

app.post('/user', appRoutes.createNewUser);
app.post('/user/:userid/artwork', appRoutes.createNewArtwork);

// RUN SERVER
app.listen(port,function(){
  console.log(`Server listening on port ${port}`);
});
