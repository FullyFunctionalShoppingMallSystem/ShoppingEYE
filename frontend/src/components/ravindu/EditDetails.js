import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { personData } = location.state || {}; // Ensure fallback if state is undefined
  
  // Use state hooks for each field in the form
  const [firstName, setFirstName] = useState(personData.firstName);
  const [lastName, setLastName] = useState(personData.lastName);
  const [email, setEmail] = useState(personData.email);
  // Add other fields as necessary

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedUserData = {
      firstName,
      lastName,
      email,
      // include other fields here
    };

    try {
      const response = await axios.put(`/person/${personData._id}`, updatedUserData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Redirect to Dashboard with updated data
      navigate('/dashboard', { state: { personData: response.data } });
    } catch (error) {
      console.error('Failed to update user details:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      </label>
      <label>
        Last Name:
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      {/* Include other fields as necessary */}
      <button type="submit">Update</button>
    </form>
  );
};

export default EditDetails;
