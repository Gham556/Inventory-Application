#! /usr/bin/env node

console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Accessory = require('./models/accessories')
var BoardGames = require('./models/boardGames')
var Genre = require('./models/genres')
var Developer = require('./models/developers')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var accessories = []
var genres = []
var boardgames = []
var developers = []

function accessoriesCreate(name, description, price, cb) {
  accessorydetail = {name: name , description: description, price: price}
  
  var accessory = new Accessory(accessorydetail);
       
  accessory.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Accessory: ' + accessory);
    accessories.push(accessory)
    cb(null, accessory)
  }  );
}

function genreCreate(name, cb) {
  var genre = new Genre({ name: name });
       
  genre.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Genre: ' + genre);
    genres.push(genre)
    cb(null, genre);
  }   );
}

function boardGamesCreate(title, playerCount, playTime, developer, genre, price, cb) {
  boardgamedetail = { 
    title: title,
    playerCount: playerCount,
    playTime: playTime,
    developer: developer,
    genre: genre,
    price: price
  }
    
  var boardgame = new BoardGames(boardgamedetail);    
  boardgame.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New BoardGame: ' + boardgame);
    boardgames.push(boardgame)
    cb(null, boardgame)
  }  );
}


function developerCreate(name, cb) {
  developerdetail = { 
    name: name,
  }    
    
  var developer = new Developer(developerdetail);    
  developer.save(function (err) {
    if (err) {
      console.log('ERROR CREATING Developer: ' + developer);
      cb(err, null)
      return
    }
    console.log('New Developer: ' + developer);
    developers.push(developer)
    cb(null, developer)
  }  );
}

function createDevelopers(cb) {
    async.parallel([
        function(callback) {
          developerCreate('Z-Man Games', callback);
        },
        function(callback) {
          developerCreate('Feuerland Spiele', callback);  
        },
        function(callback) {
            developerCreate('FryxGames', callback)
        },
        function(callback) {
            developerCreate('Greater Than Games', callback)
        },
        function(callback) {
            developerCreate('Repose Production', callback)
        },
        ],
        // optional callback
        cb);
}

function createGenres(cb) {
    async.series([
        function(callback) {
            genreCreate("Strategy", callback);
          },
          function(callback) {
            genreCreate("Thematic", callback);
          },
    ], cb);
}

function createBoardGames(cb) {
    async.series([
        
        function(callback) {
          boardGamesCreate('Pandemic Legacy: Season 1', '2-4', '60 min', developers[0], [genres[0], genres[1]], '68.99', callback);
        },
        function(callback) {
          boardGamesCreate('Ark Nova', '1-4', '90-150 min', developers[1], genres[0], '74.95', callback);
        },
        function(callback) {
          boardGamesCreate('Terraforming Mars', '1-5', '120 min', developers[2], genres[0], '44.96', callback);
        },
        function(callback) {
          boardGamesCreate('Spirit Island', '1-4', '90-120 min', developers[3], genres[0], '62.99', callback);
        },
        function(callback) {
          boardGamesCreate('7 Wonders Duel', '2', '30 min', developers[4], genres[0], '27.99', callback);
        },
        ],
        // optional callback
        cb);
}


function createAccessories(cb) {
    async.parallel([
        function(callback) {
            accessoriesCreate('Terraforming Mars: Eightbitwood Player Mat Overlay', 'This unique design helps prevent loss of game progress from table bumps and elbow slips by keeping your player cubes on the correct Production spaces and your Resources in the correct Resource Areas.', '35.99', callback)
        },
        function(callback) {
            accessoriesCreate('Spirit Island: Spirit Guide', 'Spirit Guide is an all-inclusive companion app for the board game Spirit Island.', '6.99', callback)
        },
        
        ],
        // Optional callback
        cb);
}



async.series([
    createGenres,
    createDevelopers,
    createBoardGames,
    createAccessories
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('BoardGames: '+boardgames);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});



