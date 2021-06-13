import React, { useState, createContext, useEffect, useMemo } from "react";
import {
  defaultLocation,
  defaultSearchTerm,
  locationRequest,
  locationTransform,
} from "./location.service";

export const LocationContext = createContext({});

export const locationToString = (result) => `${result.lat},${result.lng}`;

export const LocationContextProvider = ({ children }) => {
  const [keyword, setKeyword] = useState(defaultSearchTerm);
  const [location, setLocation] = useState(defaultLocation);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    onSearch(keyword);
  }, []);

  const onSearch = (searchKeyword) => {
    setKeyword(searchKeyword);
    setIsLoading(true);
    setError(null);
  };

  useEffect(() => {
    if (!keyword.length) {
      return;
    }
    locationRequest(keyword)
      .then(locationTransform)
      .then((result) => {
        setIsLoading(false);
        setLocation(result);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  }, [keyword]);

  return (
    <LocationContext.Provider
      value={{
        location,
        isLoading,
        error,
        search: onSearch,
        keyword,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
