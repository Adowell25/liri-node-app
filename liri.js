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

//Axios
var axios = require("axios")

//Arguments-the command and data input
var command = process.argv[2];
var search = process.argv[3];

//Switch function for the application logic
function dataCommand(command, search){
switch (command) {
    case "concert-this":
      concertThis();
      break;

    case "spotify-this-song":
      spotifyThis();
      break;
  
    case "movie-this":
      movieThis();
      break;
  
    case "do-what-it-says":
      doWhatItSays(search);
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

                    console.log(`\nArtist: ${userBand[i].lineup[0]} \nVenue: ${userBand[i].venue.name}\nVenue Location: ${userBand[i].venue.latitude},${userBand[i].venue.longitude}\nVenue City: ${userBand[i].venue.city}, ${userBand[i].venue.country}`)

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


// function spotifyThisSong(){
//     //spotify search format
//     spotify.search({ type: 'track', query: command, limit: 1}, function(error, data) {
//         if(error) {
//             return console.log('Song not found');
//         }
//         var spotArr = data.tracks.items;

//         for (var i = 0; i < spotArr.length; i++){
//             console.log('\nArtist: ${dat')
//         }
//     })
// }

// function doWhatItSays(){
//     fs.readFile("random.txt", "uft8", function (error, data){
//         if(error){ return console.log(error) }

//         let dataArray = data.split(",");

//         command = dataArray[0];
//         search = dataArray[1];

//         dataCommand(command, search);
//     })
//}

function doWhatItSays() {
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