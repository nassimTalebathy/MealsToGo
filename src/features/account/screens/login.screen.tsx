import React, { useContext, useState } from "react";
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

const DEFAULTS = {
  u1: { email: "admin@admin.com", password: "admin.com" },
  u2: { email: "i.am@an.email", password: "password" },
};

export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState(DEFAULTS.u1.email);
  const [password, setPassword] = useState(DEFAULTS.u1.password);

  // @ts-ignore
  const { onLogin, error, isLoading } = useContext(AuthenticationContext);

  const onLoginSubmit = () => {
    if (email === "" || password === "") return;
    onLogin(email, password);
  };

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
      {error && (
        <Spacer size="large">
          <Text variant="error">{error}</Text>
        </Spacer>
      )}
      <Spacer size="large">
        {!isLoading ? (
          <AuthButton icon="email" mode="contained" onPress={onLoginSubmit}>
            Login
          </AuthButton>
        ) : (
          <ActivityIndicator animating={true} color={Colors.purple100} />
        )}
      </Spacer>
      <Spacer size="large">
        <AuthButton
          icon="lock"
          mode="contained"
          onPress={() => navigation.goBack()}
          style={{ width: "30%" }}
        >
          Back
        </AuthButton>
        {/* <Spacer size="large">
          <AuthButton
            icon="arrow"
            mode="contained"
            onPress={() => {
              const isOne = email == DEFAULTS.u1.email;
              setEmail(isOne ? DEFAULTS.u2.email : DEFAULTS.u1.email);
              setPassword(isOne ? DEFAULTS.u2.password : DEFAULTS.u1.password);
            }}
            style={{ width: "100%" }}
          />
        </Spacer> */}
      </Spacer>
    </AccountBackground>
  );
};
