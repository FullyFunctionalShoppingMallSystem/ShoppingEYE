import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';

function UpdatePayment() {
  const history = useHistory();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    cardnumber: '',
    cvv: '',
    expdate: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:8070/payment/get/${id}`)
      .then((res) => {
        setFormData(res.data.payment);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8070/payment/update/${id}`, formData);
      alert('Payment details updated successfully!');
      history.push('/'); // Redirect to home page after update
    } catch (error) {
      console.error('Error updating payment details:', error);
      alert('An error occurred while updating payment details.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Update Payment Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cardnumber" className="form-label">Card Number:</label>
          <input
            type="text"
            className="form-control"
            id="cardnumber"
            name="cardnumber"
            value={formData.cardnumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cvv" className="form-label">CVV:</label>
          <input
            type="text"
            className="form-control"
            id="cvv"
            name="cvv"
            value={formData.cvv}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="expdate" className="form-label">Expiration Date:</label>
          <input
            type="date"
            className="form-control"
            id="expdate"
            name="expdate"
            value={formData.expdate}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </div>
  );
}

export default UpdatePayment;
