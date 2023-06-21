import React, { useEffect, useState } from "react";
import "./Pay.scss";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import newRequest from "../../utils/newRequest";
import { useParams } from "react-router-dom";
import CheckoutForm from "../../components/checkoutForm/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51NIXdEFdEw69adsIfAVfjJoG7NsI5CUXxITSEHP6ZpEUuJxHKlKE5YD1LyDcQOLbmluR3JQs51OjtUuGzgtFRelS004UHphsID"
);
console.log("IM INNNNNNNNNNNNNNNNNNNN BEFORE POAY")

const Pay = () => {
  console.log("IM INNNNNNNNNNNNNNNNNNNN")
  const [clientSecret, setClientSecret] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        console.log("Im RUNNING !!!!!!")
        const res = await newRequest.post(
          `/orders/create-payment-intent/${id}`
        );
        console.log(res.data);
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.log(err);
      }
    };
    console.log("Before");
    makeRequest();
    console.log("After");

  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return <div className="pay">
    {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
  </div>;
};

export default Pay;