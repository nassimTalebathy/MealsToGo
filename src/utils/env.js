<<<<<<< HEAD
import { Platform } from "react-native";

const liveHost = "https://us-central1-mealstogoservers.cloudfunctions.net";
const localHost = "http://localhost:5001/mealstogoservers/us-central1";

export const isAndroid = Platform.OS === "android";
export const isDevelopment = process.env.NODE_ENV === "development";
export const isMock = true;
export const host = !isDevelopment || isAndroid ? liveHost : localHost;
=======
export const live = "https://us-central1-mealstogo-a948f.cloudfunctions.net/";
export const local = "http://localhost:5001/mealstogo-a948f/us-central1";

export const host = process.env.NODE_ENV === "development" ? local : live;
>>>>>>> 26-tab-icon-simplified
