import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Payment() {
  const [formData, setFormData] = useState({
    name: '',
    cardnumber: '',
    cvv: '',
    expdate: ''
  });
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    axios.get('/payment')
      .then((res) => {
        console.log(res);
        setPayments(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

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
      await axios.post('/payment/add', formData);
      alert('Payment details added successfully!');
      setFormData({
        name: '',
        cardnumber: '',
        cvv: '',
        expdate: ''
      });
      // Refresh the list of payments after adding a new payment
      axios.get('/payment')
        .then((res) => {
          console.log(res);
          setPayments(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    } catch (error) {
      console.error('Error adding payment details:', error);
      alert('An error occurred while adding payment details.');
    }
  };

  const handleUpdate = async (id) => {
    // Implement update logic here
    console.log('Update payment with ID:', id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/payment/delete/${id}`);
      alert('Payment details deleted successfully!');
      setPayments(payments.filter((payment) => payment._id !== id));
    } catch (error) {
      console.error('Error deleting payment details:', error);
      alert('An error occurred while deleting payment details.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col">
          <h2>Add Payment Details</h2>
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
            <button type="submit" className="btn btn-success">Submit</button>
          </form>
        </div>
        <div className="col">
          <h2>Added Card Details</h2>
          <ul className="list-group mt-3">
            {payments.map((payment) => (
              <li key={payment._id} className="list-group-item">
                <strong>Name:</strong> {payment.name}<br />
                <strong>Card Number:</strong> {payment.cardnumber}<br />
                <strong>CVV:</strong> {payment.cvv}<br />
                <strong>Expiration Date:</strong> {new Date(payment.expdate).toLocaleDateString()}<br />
                <button className="btn btn-warning me-2" onClick={() => handleUpdate(payment._id)}>Update</button>
                <button className="btn btn-danger" onClick={() => handleDelete(payment._id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Payment;
