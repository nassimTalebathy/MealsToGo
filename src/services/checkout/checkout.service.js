import createStripe from "stripe-client";
import { host } from "../../utils/env";

const publicKey =
  "pk_test_51J9Ui9HZsC8PDrnp1nHMYnaqXjkzxttC1x9AMcUwk1ne9PASSGmdhY912AM24nsjnuTfdcHHz8OZ08ZSWXXCOtfe00830jO3BJ";

const stripe = createStripe(publicKey);

export const cardPaymentRequest = async (card) => {
  return stripe.createToken({ card });
};

export const payRequest = (token, amount, name) => {
  return fetch(`${host}/pay`, {
    body: JSON.stringify({
      token,
      name,
      amount,
    }),
    method: "POST",
  }).then((res) => {
    if (res.status > 200) {
      return Promise.reject("Payment failed");
    }
    res.json();
  });
};
