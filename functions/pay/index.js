module.exports.payRequest = (request, response, stripeClient) => {
  const body = JSON.parse(request.body);
  const { token, amount, name } = body;
  console.log("payment request:", name, amount);
  stripeClient.paymentIntents
    .create({
      amount,
      currency: "ZAR",
      payment_method_types: ["card"],
      payment_method_data: {
        type: "card",
        card: {
          token,
        },
      },
      confirm: true,
    })
    .then((paymentIntent) => {
      response.json(paymentIntent);
    })
    .catch((e) => {
      console.log(e);
      response.status(400);
      response.send("Payment failed\n" + JSON.stringify(e));
    });
};
