const { mocks, addMockImage } = require("./mock");
const url = require("url");
const functions = require("firebase-functions");

const API_KEY = functions.config().google.key;

const addGoogleImage = (restaurant) => {
  const ref = restaurant.photos[0].photo_reference;
  if (!ref) {
    return addMockImage(restaurant);
  }
  // const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${ref}&key=${API_KEY}`;
  // return { ...restaurant, photos: [photoUrl] };
  return addMockImage(restaurant);
};

module.exports.placesRequest = (request, response, client) => {
  const { location, mock } = url.parse(request.url, true).query;
  if (mock === "true") {
    const data = mocks[location];
    if (data) {
      data.results = data.results.map(addMockImage);
    }
    response.json(data);
  }
  client
    .placesNearby({
      params: {
        location,
        radius: 1500,
        type: "restaurants",
        key: API_KEY,
      },
      timeout: 1000,
    })
    .then((res) => {
      res.data.results = res.data.results.map(addGoogleImage);
      return response.json(res.data);
    })
    .catch((e) => {
      response.status(400);
      return response.send(e.response.data.error_message);
    });
};
