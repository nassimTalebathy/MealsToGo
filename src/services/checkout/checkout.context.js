import React, { createContext } from "react";

export const CheckoutContext = createContext({});

export const CheckoutContextProvider = ({ children }) => {
  return (
    <CheckoutContext.Provider values={{}}>{children}</CheckoutContext.Provider>
  );
};
