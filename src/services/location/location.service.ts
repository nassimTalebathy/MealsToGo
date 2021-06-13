import { locations } from "./location.mock";
import camelize from "camelize";

export const defaultSearchTerm = "san francisco";
let { lat, lng } = locations[defaultSearchTerm].results[0].geometry.location;
export const defaultLocation = { lat, lng };

export const locationRequest = (searchTerm: string = defaultSearchTerm) => {
  return new Promise((resolve, reject) => {
    let cleanTerm = cleanText(searchTerm);
    const locationMock = locations[cleanTerm];
    if (!locationMock) {
      var msg = searchTerm + " not found!";
      console.log(msg);
      reject(msg);
    }
    resolve(locationMock);
  });
};

function cleanText(s: string) {
  return s.toLowerCase();
}

export const locationTransform = (result) => {
  const { geometry = {} } = camelize(result.results)[0];
  const { lat, lng } = geometry.location;
  return { lat, lng, viewport: geometry.viewport };
};
