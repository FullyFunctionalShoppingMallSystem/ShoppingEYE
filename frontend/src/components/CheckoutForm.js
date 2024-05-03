import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CheckoutDetails() {
  const [payments, setPayments] = useState([]);
  const [cashReceiver, setCashReceiver] = useState({
    name: "",
    address: "",
    contactNumber: "",
    landmark: ""
  });

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

  const handleCashReceiverChange = (e) => {
    const { name, value } = e.target;
    setCashReceiver({ ...cashReceiver, [name]: value });
  };

  const handleAddPaymentMethod = () => {
    // Assuming you have an endpoint to save the cash payment method
    axios.post("http://localhost:8070/payment", {
      type: "cash",
      receiver: cashReceiver
    })
    .then((res) => {
      console.log(res);
      setPayments([...payments, res.data]);
      setCashReceiver({
        name: "",
        address: "",
        contactNumber: "",
        landmark: ""
      });
    })
    .catch((err) => {
      alert(err.message);
    });
  };

  return (
    <div className="container">
      <h1>Checkout Details</h1>
      <div>
        <h2>Add Payment Method</h2>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={cashReceiver.name}
          onChange={handleCashReceiverChange}
        />
        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={cashReceiver.address}
          onChange={handleCashReceiverChange}
        />
        <label>Contact Number:</label>
        <input
          type="text"
          name="contactNumber"
          value={cashReceiver.contactNumber}
          onChange={handleCashReceiverChange}
        />
        <label>Landmark:</label>
        <input
          type="text"
          name="landmark"
          value={cashReceiver.landmark}
          onChange={handleCashReceiverChange}
        />
        <button onClick={handleAddPaymentMethod}>Add Payment Method</button>
      </div>
      {/* Display payment details */}
    </div>
  );
}
