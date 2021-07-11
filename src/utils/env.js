import { Platform } from "react-native";

export const live = "https://us-central1-mealstogo-a948f.cloudfunctions.net/";
export const local = "http://localhost:5001/mealstogo-a948f/us-central1";

export const isAndroid = Platform.OS === "android";
export const isDevelopment = process.env.NODE_ENV === "development";
export const host = !isDevelopment || isAndroid ? live : local;

export const isMock = true;

console.log("Firebase functions running off", host);
