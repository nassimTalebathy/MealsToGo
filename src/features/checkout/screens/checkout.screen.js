import React, { useContext, useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { List } from "react-native-paper";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { CartContext } from "../../../services/cart/cart.context";
import { CreditCardInput } from "../components/credit-card.component";

import {
  CartIcon,
  CartIconContainer,
  NameInput,
  PayButton,
  ClearButton,
  PaymentProcessing,
} from "../components/checkout.styles";
import { RestaurantInfoCard } from "../../restaurants/components/restaurant-info-card.component";
import { payRequest } from "../../../services/checkout/checkout.service";

export const CheckoutScreen = ({ navigation }) => {
  const { cart, restaurant, sum, clearCart } = useContext(CartContext);
  const [name, setName] = useState("");
  const [card, setCard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  const onPay = () => {
    setIsLoading(true);
    if (!card || !card.id) {
      setIsLoading(false);
      setPaymentError(null);
      navigation.navigate("CheckoutError", {
        error: "Please fill in a valid credit card",
      });
      return;
    }
    payRequest(card.id, sum, name)
      .then((result) => {
        setPaymentError(null);
        setIsLoading(false);
        clearCart();
        console.log("payment result", result);
        navigation.navigate("CheckoutSuccess");
      })
      .catch((e) => {
        setPaymentError(e);
        setIsLoading(false);
        navigation.navigate("CheckoutError", {
          error: e,
        });
      });
  };

  if (!cart || cart.length === 0 || !restaurant) {
    return (
      <SafeArea>
        <CartIconContainer>
          <CartIcon bg={null} icon="cart-off" />
          <Text>Your cart is empty!</Text>
        </CartIconContainer>
      </SafeArea>
    );
  }

  return (
    <SafeArea>
      <RestaurantInfoCard restaurant={restaurant} />
      {isLoading ? (
        <PaymentProcessing />
      ) : (
        <ScrollView>
          <Spacer position="left" size="medium">
            <Spacer position="top" size="large">
              <Text>Your Order</Text>
              <List.Section>
                {cart.map(({ item, price }, index) => {
                  return (
                    <List.Item
                      key={`cart-item-${index}`}
                      title={`${item} - ${price / 100}`}
                    />
                  );
                })}
              </List.Section>
              <Text>Total: {sum / 100}</Text>
            </Spacer>
          </Spacer>
          <Spacer position="top" size="large">
            <NameInput
              label="Name"
              value={name}
              onChangeText={(t) => {
                if (t && t.length) {
                  setName(t);
                } else {
                  setName("");
                }
              }}
            />
          </Spacer>

          {name.length > 0 && (
            <CreditCardInput
              name={name}
              onSuccess={setCard}
              onError={() =>
                navigation.navigate("CheckoutError", {
                  error: "Something went wrong with your credit card info",
                })
              }
            />
          )}

          <Spacer position="top" size="xxl" />
          <PayButton disabled={isLoading} icon="cash-usd" onPress={onPay}>
            Pay
          </PayButton>
          <Spacer position="top" size="large" />
          <ClearButton disabled={isLoading} icon="cart-off" onPress={clearCart}>
            Clear cart
          </ClearButton>
        </ScrollView>
      )}
    </SafeArea>
  );
};
