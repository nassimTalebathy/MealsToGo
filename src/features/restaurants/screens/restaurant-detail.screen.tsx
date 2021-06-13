import React, { useState } from "react";
import { TouchableOpacity, Text, ScrollView } from "react-native";
import { Icon } from "react-native-elements";

import { List } from "react-native-paper";

import { SafeArea } from "../../../components/utility/safe-area.component";

import { screenNames } from "../../../infrastructure/navigation/restaurant.navigator";
import { RestaurantInfoCard } from "../components/restaurant-info-card.component";
import styled from "styled-components/native";

interface IMealInfo {
  icon: string;
  items: string[];
}

const MEALS: Record<string, IMealInfo> = {
  breakfast: { icon: "bread-slice", items: ["Eggs", "Shakshuka", "Bread"] },
  lunch: { icon: "hamburger", items: ["Burger", "Chips"] },
  dinner: { icon: "food-variant", items: ["Spaghetti", "Pizza"] },
  drinks: { icon: "cup", items: ["Vodka", "Rum", "Cola", "Coffee"] },
};

const defaultExpansions = Object.keys(MEALS).reduce((accumulator, x) => {
  accumulator[x] = false;
  return accumulator;
}, {});

const IconContainer = styled.View`
  flex: 1;
  flexDirection: row;
  alignItems: center;
  justifyContent: flex-start;
  backgroundColor: lightblue;
`;

export const RestaurantDetailScreen = ({ navigation, route }) => {
  const { restaurant } = route.params;
  const [expansions, setExpansions] = useState(defaultExpansions);

  return (
    <SafeArea>
      <IconContainer>
        <Icon
          name="arrow-undo-outline"
          type="ionicon"
          onPress={() => navigation.navigate(screenNames.restaurants)}
        />
        <Text style={{ marginLeft: 8 }}>Go back to restaurants</Text>
      </IconContainer>
      <RestaurantInfoCard restaurant={restaurant} />
      <ScrollView>
        {Object.keys(expansions).map((key, index) => (
          <List.Accordion
            title={key}
            id={`list-accordion-${key}_${index}`}
            key={`list-accordion-${key}_${index}`}
            left={(props) => <List.Icon {...props} icon={MEALS[key].icon} />}
            expanded={expansions[key]}
            onPress={() => {
              let current = Object.assign({}, expansions);
              current[key] = !current[key];
              setExpansions(current);
            }}
          >
            {MEALS[key].items.map((x) => (
              <List.Item title={x} key={`list-accordion-item-${x}`} />
            ))}
          </List.Accordion>
        ))}
      </ScrollView>
    </SafeArea>
  );
};
