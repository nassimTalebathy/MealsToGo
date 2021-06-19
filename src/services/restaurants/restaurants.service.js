import camelize from "camelize";
<<<<<<< HEAD
import { host, isMock } from "../../utils/env";

export const restaurantsRequest = (location) => {
  return fetch(`${host}/placesNearby?location=${location}&mock=${isMock}`).then(
    (res) => {
      return res.json();
    }
  );
};

export const restaurantsTransform = ({ results = [] }) => {
  const mappedResults = results.map((restaurant) => {
    return {
      ...restaurant,
      address: restaurant.vicinity,
      isOpenNow: restaurant.opening_hours && restaurant.opening_hours.open_now,
      isClosedTemporarily: restaurant.business_status === "CLOSED_TEMPORARILY",
    };
  });
=======
import { host } from "../../utils/env";

export const restaurantsRequest = (location) => {
  return fetch(host + `/placesNearby?location=${location}`).then((res) => {
    return res.json();
  });
};

export const restaurantsTransform = ({ results = [] }) => {
  const mappedResults = results.map((restaurant) => ({
    ...restaurant,
    address: restaurant.vicinity,
    isOpenNow: restaurant.opening_hours && restaurant.opening_hours.open_now,
    isClosedTemporarily: restaurant.business_status === "CLOSED_TEMPORARILY",
  }));
>>>>>>> 26-tab-icon-simplified

  return camelize(mappedResults);
};
