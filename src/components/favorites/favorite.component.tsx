import React, { useContext } from "react";
import { FavoritesContext } from "../../services/favorites/favorites.context";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import _ from "lodash";

const FavoriteButton = styled(TouchableOpacity)`
  position: relative;
  top: 5px;
  left: 80%;
  width: 44px;
  z-index: 9;
`;

export const Favorite = ({ restaurant }) => {
  const { favorites, addToFavorites, removeFromFavorites } = useContext(
    FavoritesContext
  );

  const isFavorite =
    favorites.filter((x) => x.placeId === restaurant.placeId).length > 0;

  return (
    <FavoriteButton
      onPressIn={() => {
        isFavorite
          ? removeFromFavorites(restaurant)
          : addToFavorites(restaurant);
      }}
    >
      <AntDesign
        name={isFavorite ? "heart" : "hearto"}
        size={24}
        color={isFavorite ? "red" : "black"}
      />
    </FavoriteButton>
  );
};
