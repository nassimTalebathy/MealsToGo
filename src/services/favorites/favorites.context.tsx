import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthenticationContext } from "../authentication/authentication.context";
import { useContext } from "react";

let faveContext: Partial<IFavorites> = {};
export const FavoritesContext = createContext(faveContext);

export const FavoritesContextProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const { user } = useContext(AuthenticationContext);

  const saveFavorites = async (value, uid) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(`@favorites-${uid}`, jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const loadFavorites = async (uid) => {
    try {
      const value = await AsyncStorage.getItem(`@favorites-${uid}`);
      if (value !== null) {
        setFavorites(JSON.parse(value));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const add = (restaurant) => {
    setFavorites([...favorites, restaurant]);
  };
  const remove = (restaurant) => {
    const newFaves = favorites.filter((r) => r.placeId !== restaurant.placeId);
    setFavorites(newFaves);
  };

  useEffect(() => {
    if (user && user.uid && favorites.length > 0) {
      console.log(
        `saving favorites for uid (${user.uid})- ` +
          favorites.map((x) => x.name).join(", ")
      );
      saveFavorites(favorites, user.uid);
    }
  }, [favorites, user]);

  useEffect(() => {
    if (user && user.uid) {
      loadFavorites(user.uid);
    }
  }, [user]);

  const value: IFavorites = {
    favorites,
    addToFavorites: add,
    removeFromFavorites: remove,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

interface IFavorites {
  favorites: any[];
  addToFavorites: Function;
  removeFromFavorites: Function;
}
