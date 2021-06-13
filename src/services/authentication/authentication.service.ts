import firebase from "firebase";
import env from "../../../.env.json";

// Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(env.firebaseConfig);
} else {
  firebase.app();
}

export const loginRequest = (
  email: string = "admin@admin.com",
  password: string = "admin.com"
) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

export const registerRequest = (email: string, password: string) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
};
