//OMDB API Key 10946191

console.log('Success...this is loaded...now check it out');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

exports.omdb = {
  id: process.env.omdb_ID
};

exports.bandsintown = {
  id: process.env.bands_ID
};