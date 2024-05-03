import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle, faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function SignupForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    dateOfBirth: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:8070/person/register', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        alert('Registration successful!');
        navigate('/person/login'); // Redirect or perform any other action upon successful registration
      } else {
        const errorMessage = response.data || 'Unknown error';
        console.error('Registration failed:', errorMessage);
        alert(`Registration failed: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Registration Error:', error);
      alert('User already exists.');
    }
  };


  return (
    <section>
      <div className="px-4 py-5 px-md-5 text-center text-lg-start" style={{ backgroundColor: 'hsl(0, 0%, 96%)' }}>
        <div className="container">
          <div className="row gx-lg-5 align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <h1 className="my-5 display-3 fw-bold ls-tight">
              Where Fashion Meets Convenience: <br />
                <span className="text-primary"> Elevate Your Style, Effortlessly.</span>
              </h1>
              <p style={{ color: 'hsl(217, 10%, 50.8%)' }}>
              Welcome to Mazza Gallery, your go-to online fashion haven. Discover the perfect blend of style and convenience as you explore our curated collection. From the latest trends to timeless classics, Mazza Gallery has everything you need to elevate your wardrobe effortlessly. Shop with ease and style at Mazza Gallery, where fashion meets convenience.
              </p>
            </div>

            <div className="col-lg-6 mb-5 mb-lg-0">
              <div className="card">
                <div className="card-body py-5 px-md-5">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            className="form-control"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                          />
                          <label className="form-label" htmlFor="firstName">First name</label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            className="form-control"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                          />
                          <label className="form-label" htmlFor="lastName">Last name</label>
                        </div>
                      </div>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                      <label className="form-label" htmlFor="email">Email address</label>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        id="password"
                        name="password"
                        className="form-control"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                      <label className="form-label" htmlFor="password">Password</label>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        className="form-control"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        required
                      />
                      <label className="form-label" htmlFor="dateOfBirth">Date of Birth</label>
                    </div>

                    {error && <p>{error}</p>}
                    <button type="submit" className="btn btn-primary btn-block mb-4">Sign up</button>

                    <div className="text-center">
                      <p>or sign up with:</p>
                      <button type="button" className="btn btn-link btn-floating mx-1">
                        <FontAwesomeIcon icon={faFacebookF} />
                      </button>

                      <button type="button" className="btn btn-link btn-floating mx-1">
                        <FontAwesomeIcon icon={faGoogle} />
                      </button>

                      <button type="button" className="btn btn-link btn-floating mx-1">
                        <FontAwesomeIcon icon={faTwitter} />
                      </button>

                      <button type="button" className="btn btn-link btn-floating mx-1">
                        <FontAwesomeIcon icon={faGithub} />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignupForm;
