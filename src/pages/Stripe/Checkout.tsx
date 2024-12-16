import React, { useState } from "react";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Replace with your actual Stripe Publishable Key
const stripePromise = loadStripe("pk_test_51QQrtxDU9G7KL0FR84jhvMeEHqXaKStvyHo3tPqrIKGPxf0f4DpK8Y4K6KRCKQVJgHrOy8XszBNILtV0A29e7ZQb00APsCJqf1");

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentStatus, setPaymentStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setPaymentStatus("Stripe has not been loaded.");
      return;
    }

    setLoading(true);
    setPaymentStatus("");

    // Use the PaymentElement to collect payment information
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "https://example.com/order/complete", // This is your success URL
      },
    });

    if (error) {
      // Handle the error (e.g., network error, validation issue)
      setPaymentStatus(`Payment failed: ${error.message}`);
    } else {
      setPaymentStatus("Payment successful!");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "0 auto" }}>
      <PaymentElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": { color: "#aab7c4" },
            },
            invalid: { color: "#9e2146" },
          },
        }}
      />
      <button
        type="submit"
        disabled={!stripe || loading}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#6772E5",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Processing..." : "Pay"}
      </button>
      {paymentStatus && (
        <div
          style={{
            marginTop: "10px",
            color: paymentStatus.includes("successful") ? "green" : "red",
          }}
        >
          {paymentStatus}
        </div>
      )}
    </form>
  );
};

const Checkout = () => {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Checkout</h2>
      <Elements stripe={stripePromise}>
        <PaymentForm />
      </Elements>
    </div>
  );
};

export default Checkout;
