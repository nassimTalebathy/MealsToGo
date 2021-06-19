const functions = require("firebase-functions");
const { geocodeRequest } = require("./geocode");
const { placesRequest } = require("./places");

module.exports.geocode = functions.https.onRequest((request, response) => {
  geocodeRequest(request, response);
});

module.exports.placesNearby = functions.https.onRequest((request, response) => {
  placesRequest(request, response);
});
