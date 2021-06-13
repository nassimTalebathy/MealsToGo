import React, { useState, createContext, useEffect, useMemo, useContext } from 'react';
import { LocationContext, locationToString } from '../location/location.context';
import { restaurantsRequest, restaurantsTransform, dropDuplicateRestaurants } from './restaurants.service';

export const RestaurantsContext = createContext({
  restaurants: [],
  isLoading: true,
  error: null,
});

export const RestaurantsContextProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { location } = useContext(LocationContext);

  const retrieveRestaurants = (locationString:string) => {
    setIsLoading(true);
    setError(null);
    setRestaurants([]);

    setTimeout( () => {
      restaurantsRequest(locationString)
        .then(restaurantsTransform)
        .then(dropDuplicateRestaurants)
        .then((results) => {
          setIsLoading(false);
          setRestaurants(results);
        })
        .catch(err => {
          console.log(locationString + ' - ' + err);
          setIsLoading(false);
          setError(err);
        })
      }, 500);
  }

  useEffect(() => {
    if (location) {
      const str = `${location.lat},${location.lng}`;
      retrieveRestaurants(str);
    }
  }, [location])

  return (
    <RestaurantsContext.Provider value={{
      restaurants,
      isLoading,
      error,
    }}>
      {children}
    </RestaurantsContext.Provider>
  )

};