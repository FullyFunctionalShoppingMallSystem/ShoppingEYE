import React, { useState } from "react";
import axios from "axios";

export default function CheckoutForm() {
  const [name, setName] = useState("");
  const [cardnumber, setCardnumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expdate, setExpdate] = useState("");

  function sendData(e) {
    e.preventDefault();

    const newCard = {
      name,
      cardnumber,
      cvv,
      expdate,
    };

    axios.post("http://localhost:8070/payment/add", newCard)
      .then(() => {
        alert("Card Added");
        setName("");
        setCardnumber("");
        setCvv("");
        setExpdate("");
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div className="container">
      <form onSubmit={sendData}>
        {/* Your form inputs and submit button */}
      </form>
    </div>
  );
}
