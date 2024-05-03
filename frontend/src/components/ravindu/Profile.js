import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './css/profile.css';
import axios from 'axios';

const Profile = () => {
  const initialPersonData = JSON.parse(localStorage.getItem('personData')) || {};
  const [personData, setPersonData] = useState(initialPersonData);
  const [editing, setEditing] = useState(false);
  const [activeMenu, setActiveMenu] = useState({ cart: false, addPhotos: false, wishList: false });
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
        setPersonData(response.data); // Update the local state with the new user details
        alert('Person updated successfully!');
      }
    } catch (error) {
      console.error('Error updating user by email:', error);
      alert('Failed to update user details.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserByEmail(personData.email, personData); // Pass the email and updated details to the function
    setEditing(false); // Reset editing mode
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
    navigate('/person/login');
  };

  return (
    <section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-lg-6 mb-4 mb-lg-0">
            <div className="card mb-3" style={{ borderRadius: ".5rem" }}>
              <div className="row g-0">
                <div className="col-md-4 gradient-custom text-center text-white"
                  style={{ borderTopLeftRadius: ".5rem", borderBottomLeftRadius: ".5rem" }}>
                  <img src={ "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"}
                    alt="Avatar" className="img-fluid my-5" style={{ width: "80px" }} />
                  {editing ? (
                    <input type="text" name="email" value={personData.email} onChange={handleChange} className="text-white bg-transparent border-0 text-center mb-2"/>
                  ) : (
                    <h5>{personData.email || "Email not set"}</h5>
                  )}
                  {!editing && <FontAwesomeIcon icon={faEdit} onClick={handleEditClick} className="mb-5" style={{ cursor: "pointer" }} />}
                </div>
                <div className="col-md-8">
                  <div className="card-body p-4">
                    <h6>Information</h6>
                    <hr className="mt-0 mb-4" />
                    <div className="row pt-1">
                      <div className="col-6 mb-3">
                        <h6>First Name</h6>
                        {editing ? (
                          <input type="text" name="firstName" value={personData.firstName} onChange={handleChange} />
                        ) : (
                          <p className="text-muted">{personData.firstName}</p>
                        )}
                      </div>
                      <div className="col-6 mb-3">
                        <h6>Last Name</h6>
                        {editing ? (
                          <input type="text" name="lastName" value={personData.lastName} onChange={handleChange} />
                        ) : (
                          <p className="text-muted">{personData.lastName}</p>
                        )}
                      </div>
                    </div>
                    <h6>Menu</h6>
                    <hr className="mt-0 mb-4" />
                    <div className="row pt-1">
                      <div className="col-6 mb-3" onClick={navigateToCart} style={{cursor: "pointer"}}>
                        <h6>Cart</h6>
                      </div>
                      <div className="col-6 mb-3" style={{cursor: "pointer"}}>
                        <a href='/photo' style={{textDecoration: 'none', color: 'black'}}><h6>Add Photos</h6></a>
                      </div>
                      <div className="col-6 mb-3" onClick={navigateToWishList} style={{cursor: "pointer"}}>
                        <h6>View Users</h6>
                      </div>
                      <div className="col-6 mb-3" onClick={navigateToLogout} style={{cursor: "pointer"}}>
                        <h6>LogOut</h6>
                      </div>
                    </div>
                    <div className="d-flex justify-content-start">
                      <a href="#!"><FontAwesomeIcon icon={faFacebookF} className="fa-lg me-3" /></a>
                      <a href="#!"><FontAwesomeIcon icon={faTwitter} className="fa-lg me-3" /></a>
                      <a href="#!"><FontAwesomeIcon icon={faInstagram} className="fa-lg" /></a>
                    </div>
                    {editing && <button onClick={handleSubmit} className="btn btn-primary">Submit</button>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
