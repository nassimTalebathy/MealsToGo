import { mocks, mockImages } from "./mock";
import camelize from "camelize";
import * as _ from "lodash";

export const restaurantsRequest = (
  location: string = "37.7749295,-122.4194155"
) => {
  return new Promise((resolve, reject) => {
    const mock = mocks[location];
    if (!mock) reject("no location found");
    resolve(mock);
  });
};

export const restaurantsTransform = ({ results = [] }) => {
  let newResult = results.map((restaurant) => {
    restaurant.photos = restaurant.photos.map((p) => {
      var rndNum = Math.floor(Math.random() * mockImages.length);
      return mockImages[rndNum];
    });
    return {
      ...restaurant,
      address: restaurant.vicinity,
      isOpenNow: restaurant.opening_hours && restaurant.opening_hours.open_now,
      isClosedTemporarily: restaurant.business_status === "CLOSED_TEMPORARILY",
    };
  });
  return camelize(newResult);
};

export const dropDuplicateRestaurants = (restaurants) => {
  return _.uniqBy(restaurants, (e) => e.name + '_' + e.placeId);
};
