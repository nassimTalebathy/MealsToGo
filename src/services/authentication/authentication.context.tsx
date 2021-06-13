import firebase from "firebase";
import React, { createContext, useState } from "react";
import { loginRequest, registerRequest } from "./authentication.service";

const context: Partial<IAuthenticateContext> = {};
export const AuthenticationContext = createContext(context);

export const AuthenticationContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // check if there is a session already going on
  firebase.auth().onAuthStateChanged((u) => {
    if (u) setUser(u);
    setIsLoading(false);
  });

  const onLogin = (email: string, password: string) => {
    setIsLoading(true);
    loginRequest(email, password)
      .then((u) => {
        console.log("Login");
        setUser(u.user);
      })
      .catch((e) => setError(e.toString()));
    setIsLoading(false);
  };

  const onLogout = () => {
    setIsLoading(true);
    setUser(null);
    firebase.auth().signOut();
    setIsLoading(false);
  };

  const onRegister = (
    email: string,
    password: string,
    repeatedPassword: string
  ) => {
    if (password !== repeatedPassword) {
      setError("Error: Passwords do not match");
    }
    setIsLoading(true);
    registerRequest(email, password)
      .then((u) => {
        console.log("Register");
        setUser(u.user);
      })
      .catch((e) => setError(e.toString()));
    setIsLoading(false);
  };

  const value: IAuthenticateContext = {
    user,
    isLoading,
    isAuthenticated: user !== null,
    error,
    onLogin,
    onRegister,
    onLogout,
  };

  return (
    <AuthenticationContext.Provider value={value}>
      {children}
    </AuthenticationContext.Provider>
  );
};

interface IAuthenticateContext {
  user: any;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: any;
  onLogin: Function;
  onRegister: Function;
  onLogout: Function;
}
