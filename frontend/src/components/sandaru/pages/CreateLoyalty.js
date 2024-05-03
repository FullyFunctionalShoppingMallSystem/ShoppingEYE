
import React, { useState } from "react";
import "../assets/css/pageUI.css";
import "../pages/MainHeader";
import axios from 'axios';
import Header from "../pages/MainHeader";
import { Grid } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import loyalty1 from "../assets/img/loyalty2.jpg";
import Footer from "./Footer";

function CreateLoyalty() {
  const [fullName, setFullName] = useState('');
  const [nic, setNic] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newLoyaltyMembership = { fullName, nic, email, phone };
      axios.post("http://localhost:8070/createLoyalty/addLoyl", newLoyaltyMembership)
        .then((response) => {
          alert("Membership Created!");
          setFullName('');
          setNic('');
          setEmail('');
          setPhone('');
        })
        .catch((error) => {
          console.error('Error Creating Loyalty Membership:', error);
          alert('Failed to create Loyal Membership, please try again.')
        });
    }
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!fullName.trim()) {
      errors.fullName = "Full Name is required";
      isValid = false;
    }

    // Validate NIC format
    if (!nic.trim()) {
      errors.nic = "NIC is required";
      isValid = false;
    } else if (!/^\d{9}[vVxX]$/.test(nic.trim())) {
      errors.nic = "Invalid NIC format";
      isValid = false;
    }

    // Validate email format
    if (!email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email.trim())) {
      errors.email = "Invalid email format";
      isValid = false;
    }

    // Validate phone format
    if (!phone.trim()) {
      errors.phone = "Phone is required";
      isValid = false;
    } else if (!/^\+?\d{10}$/.test(phone.trim())) {
      errors.phone = "Invalid phone format";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  return (
    <>
    <>
      <Header />
      <div className="contact-us">
        <br />
        <br />
        <Grid container ml={5}>
          <CssBaseline />
          <Grid 
          item 
          my={20} 
          p={5} 
          height={'400px'} 
          xs={'5'}
           sx={{ backgroundImage: `url(${loyalty1})`,
            backgroundRepeat: 'no-repeat',
             backgroundColor: (t) => t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover', 
              backgroundPosition: '', }} 
              />
          
          <Grid
           item 
           p={3} 
           xs={'7'}>
            <div className="page-header min-vh-100">
              <div className="container">
                <div className="row">
                  <div className="col-xl-8  col-md-7 d-flex flex-column ms-auto me-auto ">
                    <div className="card d-flex blur justify-content-center shadow-lg my-sm-0 my-sm-6 mt-8 mb-5">
                      <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
                        <div className="bg-gradient-primary shadow-primary border-radius-lg p-3">
                          <h3 className="text-white text-primary mb-0"> Loyal Membership</h3>
                        </div>
                      </div>
                      <div className="card-body">
                        <p className="pb-3" style={{ color: "black" }}>
                          Join our loyalty program today! Just fill in your name, email, and contact details below to unlock exclusive perks like discounts and special offers. 
                          Don't miss out—sign up now and start enjoying the benefits!</p>
                        <form id="contact-form" onSubmit={handleSubmit} method="post" autoComplete="off">
                          
                          <div className="card-body p-0 my-3">
                            <div className="col">
                              <div className="col-md-6">
                                <div className="input-group input-group-static mb-4">
                                  <label style={{ color: "black" }}>Full Name</label>
                                  <input type="text" className="form-control" placeholder="Full Name" value={fullName} 
                                  onChange={(e) => setFullName(e.target.value)} required />
                                  {errors.fullName && <span style={{ color: "red" }}>{errors.fullName}</span>}
                                </div>
                              </div>
                              
                              <div className="col-md-6">
                                <div className="input-group input-group-static mb-4">
                                  <label style={{ color: "black" }}>NIC</label>
                                  <input type="text" className="form-control" placeholder="200130302870v" value={nic}
                                   onChange={(e) => setNic(e.target.value)} required />
                                  {errors.nic && <span style={{ color: "red" }}>{errors.nic}</span>}
                                </div>
                              </div>
                              
                              <div className="col-md-6">
                                <div className="input-group input-group-static mb-4">
                                  <label style={{ color: "black" }}>Email</label>
                                  <input type="email" className="form-control" placeholder="MazzaGallerie@gmail.com" value={email} 
                                  onChange={(e) => setEmail(e.target.value)} 
                                  required />
                                  {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
                                </div>
                              
                              </div>
                              <div className="col-md-6">
                                <div className="input-group input-group-static mb-4">
                                  <label style={{ color: "black" }}>Phone</label>
                                  <input type="tel" className="form-control" placeholder="+94" value={phone}
                                   onChange={(e) => setPhone(e.target.value)} 
                                  required />
                                  {errors.phone && <span style={{ color: "red" }}>{errors.phone}</span>}
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-12 text-center">
                                <button type="submit" className="btn bg-gradient-primary mt-3 mb-0">Submit</button>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
       
      </div>
      
    </>
    <Footer/>
    </>
  );
}

export default CreateLoyalty;
