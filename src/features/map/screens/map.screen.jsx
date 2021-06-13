import React, { useContext, useEffect, useState } from "react";
import MapView from "react-native-maps";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Search } from "../components/search.component";
import { StyleSheet, View } from "react-native";
import { LocationContext } from "../../../services/location/location.context";
import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";
import { CompactRestaurantInfo } from "../../../components/restaurant/compact.restaurant.info";
import { screenNames } from "../../../infrastructure/navigation/restaurant.navigator";

export const MapScreen = ({ navigation }) => {
  const { location } = useContext(LocationContext);
  const { restaurants = [] } = useContext(RestaurantsContext);

  const [latDelta, setLatDelta] = useState(0);

  const { viewport, lat, lng } = location;
  useEffect(() => {
    const northEastLat = viewport.northeast.lat;
    const southWestLat = viewport.southwest.lat;
    setLatDelta(northEastLat - southWestLat);
  }, [location, viewport]);

  return (
    <SafeArea>
      <Search />
      <MapView
        style={styles.map}
        region={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: latDelta,
          longitudeDelta: 0.02,
        }}
      >
        {restaurants.map((restaurant, index) => {
          const { lng, lat } = restaurant.geometry.location;
          return (
            <MapView.Marker
              coordinate={{
                longitude: lng,
                latitude: lat,
              }}
              key={restaurant.name + "_" + index}
              title={restaurant.name}
            >
              <MapView.Callout onPress={() => navigation.navigate(screenNames.restaurantDetail, { restaurant })}>
               <CompactRestaurantInfo restaurant={restaurant} />
              </MapView.Callout>
            </MapView.Marker>
          );
        })}
      </MapView>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  map: {
    height: "100%",
    width: "100%",
  },
});
