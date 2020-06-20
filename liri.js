//add code to read and set any environment variables with the dotenv package
require("dotenv").config();

//Require Request
var request = require("request");

//Require Moment
var moment = require('moment');

//File Systems
var fs = require("fs");

//Key page
var keys = require("./keys.js");

//Spotify
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

//OMDB and bandsintown
var omdb = (keys.omdb);
var bandsintown = (keys.bandsintown);

//Arguments-the command and data input
var command = process.argv[2];
var search = process.argv[3];

//Switch function for the application logic
function dataCommand(command, search){
switch (command) {
    case "concert-this":
      concertThis(command);
      break;

    case "spotify-this-song":
      spotifyThis(command);
      break;
  
    case "movie-this":
      movieThis(command);
      break;
  
    case "do-what-it-says":
      doThis(command);
      break;

    default:
        console.log("Invalid Command");
        break;
  }
}

dataCommand(command, search);

function concertThis(){
console.log(`\n - - - - -\n`);

    request("https://rest.bandsintown.com/artists/" + search + "/events?app_id=" + bandsintown, function (error, response, body) {
            // data in JSON format
            if (!error && response.statusCode === 200) {
            var userBand = JSON.parse(body);
            // Parse and loop the data
            if (userBand.length > 0) {
                for (i = 0; i < 1; i++) {

                    console.log(`\nArtist: ${userBand[i].lineup[0]} \nVenue: ${userBand[i].venue.name}\nVenue Location: ${userBand[i].venue.latitude},
                    ${userBand[i].venue.longitude}\nVenue City: ${userBand[i].venue.city}, ${userBand[i].venue.country}`)

                    // Moment date format MM/DD/YYYY
                    var concertDate = moment(userBand[i].datetime).format("MM/DD/YYYY hh:00 A");
                    console.log(`Date and Time: ${concertDate}\n\n- - - - -`);
                };
            } else {
                console.log('Band or concert not found!');
            };
        }
        }
      )};


function spotifyThis(){
    //spotify search format
    console.log(`\n - - - - -`);

    // search format
    spotify.search({
        type: 'track',
        query: search,
        limit: 1
    }, function (error, data) {
        if (error) {
            return console.log(data);
        }
        //data formatted in an array
        var spotifyArr = data.tracks.items;

        for (i = 0; i < spotifyArr.length; i++) {
           //console.log(spotifyArr[i])
            console.log(`\nArtist: ${data.tracks.items[i].album.artists[0].name} \nSong: ${data.tracks.items[i].name}\nAlbum: ${data.tracks.items[i].album.name}\nSpotify link: ${data.tracks.items[i].external_urls.spotify}\n\n - - - - -`)
        };
    });
}

function movieThis() {
     if (!search) {
       search = "Mr. Nobody";
     };
    // OMDB api request
    request("http://www.omdbapi.com/?t=" + search + "&apikey=10946191", function (error, response, body) {
        var userMovie = JSON.parse(body);

        
        var ratingsArr = userMovie.Ratings;
        if (ratingsArr.length > 2) {}

        if (!error && response.statusCode === 200) {
            console.log(`\nTitle: ${userMovie.Title}\nCast: ${userMovie.Actors}\nReleased: ${userMovie.Year}\nIMDb Rating: 
            ${userMovie.imdbRating}\nRotten Tomatoes Rating: ${userMovie.Ratings[1].Value}\nCountry: 
            ${userMovie.Country}\nLanguage: ${userMovie.Language}\nPlot: ${userMovie.Plot}\n\n- - - - -`)


        } else {
            return console.log("Movie able to be found. Error:" + error)
        };
    })
};

function doThis() {
    //File system to read txt file
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        // New data array, using split to separate the objects
        var dataArr = data.split(",");

        // Passing txt from the txt file as a parameter
        command = dataArr[0];
        search = dataArr[1];
        //Calling switch function
        dataCommand(command, search);
    });
};