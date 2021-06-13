import React from "react";
import { View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { screenNames } from "../../infrastructure/navigation/restaurant.navigator";
import { CompactRestaurantInfo } from "../restaurant/compact.restaurant.info";
import { Spacer } from "../spacer/spacer.component";
import { Text } from "../typography/text.component";

const FavoritesWrapper = styled.View`
  padding: 10px;
`;

export const FavortiesBar = ({ favorites, onNavigate }) => {
  if (favorites.length === 0) {
    return null;
  }

  return (
    <FavoritesWrapper>
      <Spacer variant="left.large">
        <Text variant="caption">Favorites</Text>
      </Spacer>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {favorites.map((restaurant) => {
          const key = restaurant.name.split(" ").join("");
          return (
            <Spacer key={key} position="left" size="medium">
              <TouchableOpacity
                onPress={() =>
                  onNavigate(screenNames.restaurantDetail, { restaurant })
                }
              >
                <CompactRestaurantInfo restaurant={restaurant} />
              </TouchableOpacity>
            </Spacer>
          );
        })}
      </ScrollView>
    </FavoritesWrapper>
  );
};
