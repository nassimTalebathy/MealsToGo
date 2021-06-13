import React from "react";
import { SvgXml } from "react-native-svg";
import { Alert, StyleProp } from "react-native";

import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import star from "../../../../assets/star";
import open from "../../../../assets/open";

import {
  StyledImage,
  RestaurantCard,
  RestaurantCardCover,
  Address,
  Info,
  Rating,
  Section,
  SectionEnd,
} from "./restaurant-info-card.styles";
import { Favorite } from "../../../components/favorites/favorite.component";
import { screenNames } from "../../../infrastructure/navigation/restaurant.navigator";
import { TouchableOpacity } from "react-native-gesture-handler";

export const RestaurantInfoCard = ({ restaurant, onPressCardCover }) => {
  const {
    name = "Some Restaurant",
    icon = "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
    photos = [
      "https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg",
    ],
    rating = 4,
    address = "100 some random street",
    isOpenNow = true,
    isClosedTemporarily = true,
  } = restaurant;

  const ratingArray = Array.from(new Array(Math.floor(rating)));

  return (
    <RestaurantCard elevation={5}>
      <Favorite restaurant={restaurant} />
      <TouchableOpacity onPressIn={onPressCardCover} key={`touch-${name}`}>
        <RestaurantCardCover
          source={{ uri: photos[0] }}
          // defaultSource="../../../../assets/icon.png"
        />
      </TouchableOpacity>

      <Info>
        <Text variant="label">{name}</Text>
        <Section>
          <Rating>
            {ratingArray.map((x, index) => (
              <StyledImage key={`icon-${name}-${index}`} />
            ))}
          </Rating>
          <SectionEnd>
            {isClosedTemporarily && (
              <Text variant="error">CLOSED TEMPORARILY</Text>
            )}
            <Spacer position="left" size="large">
              {/* {isOpenNow && <SvgXml xml={open} width={20} height={20} />} */}
              {isOpenNow && !isClosedTemporarily && <Text>Open now</Text>}
              {!isOpenNow && !isClosedTemporarily && <Text>Not open now</Text>}
            </Spacer>
            <Spacer position="left" size="large">
              <StyledImage
                source={{ uri: icon }}
                alt="../../../../assets/favicon.png"
              />
            </Spacer>
          </SectionEnd>
        </Section>
        <Address>{address}</Address>
      </Info>
    </RestaurantCard>
  );
};
