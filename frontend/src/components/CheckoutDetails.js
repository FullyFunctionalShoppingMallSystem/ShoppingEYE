import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CheckoutDetails() {
  const [payments, setPayments] = useState([]);

  useEffect (() => {
    function getPayments() {
      axios.get("http://localhost:8070/payment")
        .then((res) => {
          console.log(res);
          setPayments(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getPayments();
  }, []);

  return (
    <div className="container">
      <h1>Checkout Details</h1>
      {/* Display payment details */}
    </div>
  );
}
