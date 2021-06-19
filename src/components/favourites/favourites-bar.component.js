import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
<<<<<<< HEAD
import { Card } from "react-native-paper";
=======
>>>>>>> 26-tab-icon-simplified
import styled from "styled-components/native";
import { Spacer } from "../spacer/spacer.component";
import { CompactRestaurantInfo } from "../restaurant/compact-restaurant-info.component";
import { Text } from "../typography/text.component";

<<<<<<< HEAD
const FavouritesWrapper = styled(Card)`
  padding: 10px;
  z-index: 999;
  border-radius: 15px;
=======
const FavouritesWrapper = styled.View`
  padding: 10px;
>>>>>>> 26-tab-icon-simplified
`;
export const FavouritesBar = ({ favourites, onNavigate }) => {
  if (!favourites.length) {
    return null;
  }
  return (
<<<<<<< HEAD
    <FavouritesWrapper elevation={3}>
=======
    <FavouritesWrapper>
>>>>>>> 26-tab-icon-simplified
      <Spacer variant="left.large">
        <Text variant="caption">Favourites</Text>
      </Spacer>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {favourites.map((restaurant) => {
          const key = restaurant.name;
          return (
            <Spacer key={key} position="left" size="medium">
              <TouchableOpacity
                onPress={() =>
                  onNavigate("RestaurantDetail", {
                    restaurant,
                  })
                }
              >
                <CompactRestaurantInfo restaurant={restaurant} />
              </TouchableOpacity>
            </Spacer>
          );
        })}
      </ScrollView>
    </FavouritesWrapper>
  );
};
