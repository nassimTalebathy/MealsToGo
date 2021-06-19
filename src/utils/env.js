export const live = "https://us-central1-mealstogo-a948f.cloudfunctions.net/";
export const local = "http://localhost:5001/mealstogo-a948f/us-central1";

export const host = process.env.NODE_ENV === "development" ? local : live;
