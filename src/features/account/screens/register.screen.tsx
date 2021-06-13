import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Colors } from "react-native-paper";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import {
  AccountBackground,
  AccountCover,
  AuthButton,
  AuthInput,
  Title,
} from "../components/accounts.style";

export const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("i.am@an.email");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");

  // @ts-ignore
  const { onRegister, error, isLoading, user } = useContext(
    AuthenticationContext
  );

  const onRegiserSubmit = () => {
    if (email === "" || password === "" || repeatedPassword === '"') return;
    onRegister(email, password, repeatedPassword);
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <AccountBackground>
      <AccountCover />
      <Title>Meals To Go</Title>
      <AuthInput
        label="E-mail"
        value={email}
        textContentType="emailAddress"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={(t) => setEmail(t)}
      />
      <Spacer size="large">
        <AuthInput
          label="Password"
          value={password}
          textContentType="password"
          secureTextEntry
          secure
          autoCapitalize="none"
          onChangeText={(t) => setPassword(t)}
        />
      </Spacer>
      <Spacer size="large">
        <AuthInput
          label="Repeated Password"
          value={repeatedPassword}
          textContentType="password"
          secureTextEntry
          secure
          autoCapitalize="none"
          onChangeText={(t) => setRepeatedPassword(t)}
        />
      </Spacer>
      {error && (
        <Spacer size="large">
          <Text variant="error">{error}</Text>
        </Spacer>
      )}
      <Spacer size="large">
        {!isLoading ? (
          <AuthButton icon="email" mode="contained" onPress={onRegiserSubmit}>
            Register
          </AuthButton>
        ) : (
          <ActivityIndicator animating={true} color={Colors.purple100} />
        )}
      </Spacer>
      <Spacer size="large">
        <AuthButton
          icon="arrow"
          mode="contained"
          onPress={() => navigation.goBack()}
          style={{ width: "30%" }}
        >
          Back
        </AuthButton>
      </Spacer>
    </AccountBackground>
  );
};
