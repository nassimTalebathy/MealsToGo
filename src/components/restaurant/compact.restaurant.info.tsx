import React from "react";
import { Platform, TouchableOpacity } from "react-native";
import { WebView } from "react-native-webview";

import styled from "styled-components/native";
import { Text } from "../typography/text.component";

const defaultIcon = "../../../assets/icon.jpg";

const StyledText = styled.Text`
  color: ${(props) => props.theme.colors.ui.primary};
`;

const CompactImage = styled.Image`
  border-radius: 10px;
  width: 120px;
  height: 100px;
`;

const CompactWebview = styled(WebView)`
  border-radius: 10px;
  width: 120px;
  height: 100px;
`;

const Item = styled.View`
  padding: 10px;
  max-width: 120px;
  align-items: center;
`;

const isAndroid = Platform.OS === "android";

export const CompactRestaurantInfo = ({ restaurant }) => {
  const { photos } = restaurant;

  const Image = isAndroid ? CompactWebview : CompactImage;

  return (
    <TouchableOpacity onPress={() => null}>
      <Item>
        <Image source={{ uri: photos ? photos[0] : defaultIcon }} />
        <Text center variant="caption" numberOfLines={3}>
          {restaurant.name}
        </Text>
      </Item>
    </TouchableOpacity>
  );
};
