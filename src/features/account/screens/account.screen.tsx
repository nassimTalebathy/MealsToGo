import React from "react";

import { Spacer } from "../../../components/spacer/spacer.component";
import {
  AccountBackground,
  AccountContainer,
  AccountCover,
  AuthButton,
  Title,
  AnimationWrapper,
} from "../components/accounts.style";

import LottieView from "lottie-react-native";
import { useEffect } from "react";
import { useState } from "react";

export const AccountScreen = ({ navigation }) => {
  const [watermelon, setWatermelon] = useState(null);
  const pathToWatermelon = "../../../../assets/watermelon.json";
  useEffect(() => {
    setWatermelon(require(pathToWatermelon));
  }, []);

  return (
    <>
      <AccountBackground>
        <AccountCover />
        <AnimationWrapper>
          <LottieView
            key="animation"
            autoPlay
            loop
            resizeMode="cover"
            source={watermelon ? watermelon : require(pathToWatermelon)}
          />
        </AnimationWrapper>
        <Title>Meals To Go</Title>
        <AccountContainer>
          <AuthButton
            icon="lock-open-outline"
            mode="contained"
            onPress={() => navigation.navigate("Login")}
          >
            Login
          </AuthButton>
          <Spacer size="large">
            <AuthButton
              icon="email"
              mode="contained"
              onPress={() => navigation.navigate("Register")}
            >
              Register
            </AuthButton>
          </Spacer>
        </AccountContainer>
      </AccountBackground>
    </>
  );
};
