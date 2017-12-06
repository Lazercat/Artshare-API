/************************************
        ARTSHARE EXPRESS API
  Written and Owned by: Jesse Lewis
*************************************/

//Dependencies
const mongoose = require('mongoose');
const express = require('express');
const multer = require('multer'); // file storing middleware
const bodyParser = require('body-parser');
require('dotenv').config();

//Setup App
const app = express();
const port = process.env.PORT || 3001;

// Add headers
app.use(function (req, res, next) {

  var allowedOrigins = [ 'https://artshare-react.herokuapp.com' , 'http://localhost:3000', 'http://localhost:3001' ];
  var origin = req.headers.origin;
  if(allowedOrigins.indexOf(origin) > -1){
       res.setHeader('Access-Control-Allow-Origin', origin);
  }

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTION, PUT, PATCH');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', false);

    // Pass to next layer of middleware
    next();
});



// Config file uploads
const multerConfig = {

storage: multer.diskStorage({
 //Setup where the user's file will go
 destination: function(req, file, next){
   next(null, './public/uploads');
   },
    //Then give the file a unique name
    filename: function(req, file, next){
        console.log(file);
        const ext = file.mimetype.split('/')[1];
        next(null, file.fieldname + '-' + Date.now() + '.'+ext);
      }
    }),
    //A means of ensuring only images are uploaded.
    fileFilter: function(req, file, next){
          if(!file){
            next();
          }
        const image = file.mimetype.startsWith('image/');
        if(image){
          console.log('photo uploaded');
          next(null, true);
        }else{
          console.log("file not supported");
          //TODO:  A better message response to user on failure.
          return next();
        }
    }
  };

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
app.get('/user/:facebkid', appRoutes.getThisUser);
app.get('/artworks', appRoutes.getAllArtworks);
app.get('/artwork/:artid', appRoutes.getArtwork);
app.get('/artworks/:userid', appRoutes.getMyArtworks);
app.get('/artworks/tags/:tagid', appRoutes.getMyTagArtworks);

app.post('/user', appRoutes.createNewUser);
app.post('/artwork', appRoutes.createNewArtwork);

//File Uploads
app.post('/upload',multer(multerConfig).single('photo'),function(req,res){
   res.send('Complete!');
});


// RUN SERVER
app.listen(port,function(){
  console.log(`Server listening on port ${port}`);
});
