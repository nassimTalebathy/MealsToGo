const functions = require("firebase-functions");
const { geocodeRequest } = require("./geocode");
const { placesRequest } = require("./places");
const { payRequest } = require("./pay");

const { Client } = require("@googlemaps/google-maps-services-js");

const stripeClient = require("stripe")(functions.config().stripe.key);

const googleClient = new Client({});

module.exports.geocode = functions.https.onRequest((request, response) => {
  geocodeRequest(request, response, googleClient);
});

module.exports.placesNearby = functions.https.onRequest((request, response) => {
  placesRequest(request, response, googleClient);
});

module.exports.pay = functions.https.onRequest((request, response) => {
  payRequest(request, response, stripeClient);
});
