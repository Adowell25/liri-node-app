# liri-node-app

Similar to SIRI for iPhone, this is LIRI (Language Interpretation and Recognition Interface). Liri
is a command line node app that takes parameters and returns the data.

Packages Installed:
Dotenv - Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. 

Request - Request is designed to be the simplest way possible to make http calls. It supports HTTPS and follows redirects by    default.

Moment - A lightweight JavaScript date library for parsing, validating, manipulating, and formatting dates.

Fs - built in node package (File systems)

Spotify - A simple to use API library for the Spotify REST API.

Npm, www.npmjs.com/.

How it works

Using switch case, 4 commands are passed depending on which command is chosen followed by the search case. Each command
will return the specified data for each concert, song, and movie. The "do-what-it-says" function is a spotify call working the same as "spotify-this-song".

concert-this

User inputs the command(concert-this) and the search criteria(Artist) and the Name, Venue, Venue City, and Date/Time returns.



