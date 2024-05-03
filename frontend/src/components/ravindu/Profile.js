import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const initialPersonData = JSON.parse(localStorage.getItem('personData')) || {};
  const [personData, setPersonData] = useState(initialPersonData);
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  const handleEditClick = () => {
    setEditing(true);
  };

  const updateUserByEmail = async (email, updatedDetails) => {
    try {
      const response = await axios.put(`http://localhost:8070/person/updateByEmail/${email}`, updatedDetails, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.data) {
        setPersonData(response.data);
        alert('Person updated successfully!');
      }
    } catch (error) {
      console.error('Error updating user by email:', error);
      alert('Failed to update user details.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserByEmail(personData.email, personData);
    setEditing(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPersonData((prevPersonData) => ({
      ...prevPersonData,
      [name]: value,
    }));
  };

  const navigateToCart = () => {
    navigate('/cart');
  };

  const navigateToWishList = () => {
    navigate('/person/personlist');
  };

  const navigateToLogout = () => {
    navigate('/');
  };

  return (
    <section>
      <div>
        <div>
          <div>
            <div>
              {editing ? (
                <input type="text" name="email" value={personData.email} onChange={handleChange} />
              ) : (
                <h5>{personData.email || "Email not set"}</h5>
              )}
              {!editing && <FontAwesomeIcon icon={faEdit} onClick={handleEditClick} style={{ cursor: "pointer" }} />}
            </div>
            <div>
              <div>
                <h6>Information</h6>
                <hr />
                <div>
                  <div>
                    <h6>First Name</h6>
                    {editing ? (
                      <input type="text" name="firstName" value={personData.firstName} onChange={handleChange} />
                    ) : (
                      <p>{personData.firstName}</p>
                    )}
                  </div>
                  <div>
                    <h6>Last Name</h6>
                    {editing ? (
                      <input type="text" name="lastName" value={personData.lastName} onChange={handleChange} />
                    ) : (
                      <p>{personData.lastName}</p>
                    )}
                  </div>
                </div>
                <h6>Menu</h6>
                <hr />
                <div>
                  <div onClick={navigateToCart} style={{ cursor: "pointer" }}>
                    <h6>Cart</h6>
                  </div>
                  <div style={{ cursor: "pointer" }}>
                    <a href='/photo'><h6>Add Photos</h6></a>
                  </div>
                  <div onClick={navigateToWishList} style={{ cursor: "pointer" }}>
                    <h6>View Users</h6>
                  </div>
                  <div onClick={navigateToLogout} style={{ cursor: "pointer" }}>
                    <h6>LogOut</h6>
                  </div>
                </div>
                <div>
                  <a href="#!"><FontAwesomeIcon icon={faFacebookF} className="me-3" /></a>
                  <a href="#!"><FontAwesomeIcon icon={faTwitter} className="me-3" /></a>
                  <a href="#!"><FontAwesomeIcon icon={faInstagram} /></a>
                </div>
                {editing && <button onClick={handleSubmit}>Submit</button>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
