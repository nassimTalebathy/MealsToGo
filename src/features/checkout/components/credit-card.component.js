import React from "react";
import { LiteCreditCardInput } from "react-native-credit-card-input";
import { useEffect } from "react/cjs/react.production.min";
import { cardPaymentRequest } from "../../../services/checkout/checkout.service";

export const CreditCardInput = ({ name, onSuccess, onError }) => {
  const onChange = async (formData) => {
    const { valid, status, values } = formData;
    const isIncomplete = Object.values(status).includes("incomplete");

    if (!isIncomplete && valid) {
      const [exp_month, exp_year] = values.expiry.split("/");
      const card = {
        number: values.number.replaceAll(" ", ""),
        exp_month,
        exp_year,
        cvc: values.cvc,
        name: name,
      };
      try {
        const info = await cardPaymentRequest(card);
        onSuccess(info);
        return info;
      } catch (e) {
        console.log("e");
        onError();
      }
    }

    return null;
  };

  return <LiteCreditCardInput onChange={onChange} />;
};
