import styled from "styled-components/native";
import { FlatList } from "react-native";
<<<<<<< HEAD
import { Button } from "react-native-paper";
import { colors } from "../../../infrastructure/theme/colors";
=======
>>>>>>> 26-tab-icon-simplified

export const RestaurantList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;
<<<<<<< HEAD

export const OrderButton = styled(Button).attrs({
  color: colors.brand.primary,
})`
  padding: ${(props) => props.theme.space[2]};
  width: 80%;
  align-self: center;
`;
=======
>>>>>>> 26-tab-icon-simplified
