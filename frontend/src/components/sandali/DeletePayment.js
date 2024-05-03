import React, { useEffect } from 'react';
import axios from 'axios';

function DeletePayment() {
  useEffect(() => {
    // Set the paymentId from the URL parameter
    const url = window.location.href;
    const id = url.substring(url.lastIndexOf('/') + 1);

    // Delete payment details using the paymentId
    axios.delete(`/payment/delete/${id}`)
      .then(() => {
        alert('Payment details deleted successfully!');
        window.location.href = '/'; // Redirect to home page after delete
      })
      .catch((err) => {
        console.error('Error deleting payment details:', err);
        alert('An error occurred while deleting payment details.');
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2>Delete Payment Details</h2>
      <p>Deleting payment details...</p>
    </div>
  );
}

export default DeletePayment;
