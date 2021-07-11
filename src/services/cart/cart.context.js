import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, createContext, useContext } from "react";
import { AuthenticationContext } from "../authentication/authentication.context";
import _ from "lodash";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const { user } = useContext(AuthenticationContext);

  const [cart, setCart] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const [sum, setSum] = useState(0);

  useEffect(() => {
    if (cart.length === 0) {
      setSum(0);
    } else {
      const newSum = _.sumBy(cart, (x) => x.price);
      setSum(newSum);
    }
  }, [cart]);

  const add = (item, rst) => {
    if (!restaurant || restaurant.placeId !== rst.placeId) {
      setRestaurant(rst);
      setCart([item]);
    } else {
      setCart([...cart, item]);
    }
  };

  const clear = () => {
    setCart([]);
    setRestaurant(null);
  };

  // loading
  const loadCart = async (uid) => {
    try {
      const value = await AsyncStorage.getItem(`@cart-${uid}`);
      if (value != null) {
        const { restaurant: rst, cart: crt } = JSON.parse(value);
        setRestaurant(rst);
        setCart(crt);
      }
    } catch (e) {
      console.log("error loading ", e);
    }
  };
  useEffect(() => {
    if (user && user.uid) {
      loadCart(user.uid);
    }
  }, [user]);

  // saving
  const saveCart = async (rst, crt, uid) => {
    try {
      const jsonValue = JSON.stringify({ restaurant: rst, cart: crt });
      await AsyncStorage.setItem(`@cart-${uid}`, jsonValue);
    } catch (e) {
      console.log("error storing ", e);
    }
  };
  useEffect(() => {
    if (user && user.uid) {
      saveCart(restaurant, cart, user.uid);
    }
  }, [restaurant, user, cart]);

  return (
    <CartContext.Provider
      value={{
        addToCart: add,
        clearCart: clear,
        restaurant,
        cart,
        sum,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
