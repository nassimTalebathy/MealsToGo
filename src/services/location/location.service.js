import camelize from "camelize";
<<<<<<< HEAD
import { host, isMock } from "../../utils/env";

export const locationRequest = (searchTerm) => {
  return fetch(`${host}/geocode?city=${searchTerm}&mock=${isMock}`).then(
    (res) => {
      return res.json();
    }
  );
};

export const locationTransform = (result) => {
=======
import { host } from "../../utils/env";

export const locationRequest = (searchTerm) => {
  console.log(host);
  return fetch(host + `/geocode?city=${searchTerm}`).then((res) => {
    return res.json();
  });
};

export const locationTransform = (result) => {
  console.log(result);
>>>>>>> 26-tab-icon-simplified
  const formattedResponse = camelize(result);
  const { geometry = {} } = formattedResponse.results[0];
  const { lat, lng } = geometry.location;

  return { lat, lng, viewport: geometry.viewport };
};
