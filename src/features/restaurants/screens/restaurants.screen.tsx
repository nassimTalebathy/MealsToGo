import React, { useContext, useState } from "react";
import { Colors } from "react-native-paper";
import { ActivityIndicator, View } from "react-native";
import styled from "styled-components/native";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { RestaurantInfoCard } from "../components/restaurant-info-card.component";

import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";
import { FavoritesContext } from "../../../services/favorites/favorites.context";
import { Search } from "../components/search.component";

import { screenNames } from "../../../infrastructure/navigation/restaurant.navigator";
import { FavortiesBar } from "../../../components/favorites/favorites.bar.component";
import { FlatList } from "react-native";

import { FadeInView } from "../../../components/animations/fade.animation";

const RestaurantList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;

export const RestaurantListComponent = ({ restaurants, navigation }) => {
  return (
    <RestaurantList
      data={restaurants}
      renderItem={({ item }) => (
        <View>
          <FadeInView>
            <RestaurantInfoCard
              restaurant={item}
              onPressCardCover={() =>
                navigation.navigate(screenNames.restaurantDetail, {
                  restaurant: item,
                })
              }
            />
          </FadeInView>
        </View>
      )}
      keyExtractor={(item, idx) => `${item.name}_${idx}`}
    />
  );
};
const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

const Loading = ({ margin = 25 }) => {
  return (
    <ActivityIndicator
      size={margin * 2}
      style={{ marginLeft: -1 * margin }}
      animating={true}
      color={Colors.blue300}
    />
  );
};

const ErrorText = styled.Text`
  color: ${(props) => props.theme.fontSizes.h4};
  bold: true;
  size: ${(props) => props.theme.colors.ui.error};
`;

export const RestaurantsScreen = ({ navigation }) => {
  const { restaurants, isLoading, error } = useContext(RestaurantsContext);
  const { favorites } = useContext(FavoritesContext);
  const [isToggled, setIsToggled] = useState(false);

  return (
    <SafeArea>
      {isLoading && (
        <LoadingContainer>
          <Loading />
        </LoadingContainer>
      )}
      <Search
        isFavoritesToggled={isToggled}
        onFavoritesToggle={() => setIsToggled(!isToggled)}
      />
      {isToggled && (
        <FavortiesBar favorites={favorites} onNavigate={navigation.navigate} />
      )}
      {error ? (
        <LoadingContainer>
          <ErrorText>{error}</ErrorText>
        </LoadingContainer>
      ) : (
        <RestaurantListComponent
          restaurants={restaurants}
          navigation={navigation}
        />
      )}
    </SafeArea>
  );
};
