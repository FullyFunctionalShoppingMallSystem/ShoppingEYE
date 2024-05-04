import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CheckoutDetails() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    function getPayments() {
      axios.get("/payment")
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
    <div className="container mt-5">
      <h1>Checkout Details</h1>
      <ul className="list-group mt-3">
        {payments.map((payment) => (
          <li key={payment._id} className="list-group-item">
            <strong>Name:</strong> {payment.name}<br />
            <strong>Card Number:</strong> {payment.cardnumber}<br />
            <strong>CVV:</strong> {payment.cvv}<br />
            <strong>Expiration Date:</strong> {new Date(payment.expdate).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
