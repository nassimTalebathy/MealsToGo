import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { RestaurantsScreen } from "../../features/restaurants/screens/restaurants.screen";
import { RestaurantDetailScreen } from "../../features/restaurants/screens/restaurant-detail.screen";

export const screenNames = {
  restaurants: "Restaurants",
  restaurantDetail: "RestaurantDetail",
};

const RestaurantsStack = createStackNavigator();

export const RestaurantNavigator = () => {
  return (
    <RestaurantsStack.Navigator
      headerMode="none"
      screenOptions={{
        ...TransitionPresets.ModalTransition,
      }}
    >
      {/* inject {navigation} into component */}
      <RestaurantsStack.Screen
        name={screenNames.restaurants}
        component={RestaurantsScreen}
      />
      <RestaurantsStack.Screen
        name={screenNames.restaurantDetail}
        component={RestaurantDetailScreen}
      />
    </RestaurantsStack.Navigator>
  );
};
