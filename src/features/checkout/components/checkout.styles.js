import styled from "styled-components/native";
import {
  Avatar,
  TextInput,
  Button,
  ActivityIndicator,
  Colors,
} from "react-native-paper";
import { theme } from "../../../infrastructure/theme/index.js";

export const CartIconContainer = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;
export const CartIcon = styled(Avatar.Icon).attrs({
  size: 128,
})`
  background-color: ${(props) => props.bg || props.theme.colors.brand.primary};
`;

export const NameInput = styled(TextInput)`
  margin: ${(props) => props.theme.space[3]};
`;

const getButton = (color) => styled(Button).attrs({
  color,
  mode: "contained",
})`
  align-self: center;
  width: 80%;
  padding: ${theme.space[2]};
`;

export const PayButton = getButton(theme.colors.brand.primary);
export const ClearButton = getButton(theme.colors.ui.error);

export const PaymentProcessing = styled(ActivityIndicator).attrs({
  size: 128,
  animating: true,
  color: Colors.blue300,
})`
  position: absolute;
  top: 50%;
  left: 5%;
  z-index: 9999;
`;
