import React, { useContext } from "react";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { FavoritesContext } from "../../../services/favorites/favorites.context";
import { Text } from "../../../components/typography/text.component";

import styled from "styled-components/native";
import { RestaurantListComponent } from "../../restaurants/screens/restaurants.screen";

const NoFavoritesArea = styled(SafeArea)`
  align-items: center;
  justify-content: center;
`;

export const FavoritesScreen = ({ navigation }) => {
  const { favorites } = useContext(FavoritesContext);

  return favorites.length ? (
    <SafeArea>
      <RestaurantListComponent
        restaurants={favorites}
        navigation={navigation}
      />
    </SafeArea>
  ) : (
    <NoFavoritesArea>
      <Text>No favorites found</Text>
    </NoFavoritesArea>
  );
};
