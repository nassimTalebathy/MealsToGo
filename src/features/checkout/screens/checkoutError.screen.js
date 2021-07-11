import React from "react";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { Text } from "../../../components/typography/text.component";

import { CartIcon, CartIconContainer } from "../components/checkout.styles";
import { theme } from "../../../infrastructure/theme";

export const CheckoutErrorScreen = ({ route }) => {
  const { error = "" } = route.params;
  return (
    <SafeArea>
      <CartIconContainer>
        <CartIcon icon="close" bg={theme.colors.ui.error} />
        <Text variant="label">{error}</Text>
      </CartIconContainer>
    </SafeArea>
  );
};
