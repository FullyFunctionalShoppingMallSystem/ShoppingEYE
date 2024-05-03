import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

import FooterUI from './FooterUI';
import "./assets/css/login.css"

function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8070/person/login', formData);
      if (response.status === 200) {
        // Assuming the response includes the person's data excluding the password
        const { data } = response;
        // Save necessary data to local storage
        localStorage.setItem('personData', JSON.stringify({
          firstName: data.person.firstName,
          lastName: data.person.lastName,
          email: data.person.email,
          dateOfBirth: data.person.dateOfBirth,
        }));
        navigate('/person/profile'); // Redirect to profile using navigate
      } else {
        throw new Error('Failed to login');
      }
    } catch (error) {
      console.error('Error:', error.response?.data?.error || 'Failed to login. Please try again.');
      setError('Failed to login. Please try again.');
    }
  };

  return (
    <>
    <div  className='bg'>
  
    <div style={styles.container}>
      <h2 style={styles.title}>Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label2}>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        
        <button type="submit" style={styles.button}>Login</button>
        
      </form>
      {error && <div style={styles.error}>{error}</div>}
      <a href='/person/register' style={{textDecoration: 'none', color: 'red'}}><h6>Not Registered ? Register Now</h6></a>
    </div>
    <br></br>
    </div>
   
    <FooterUI/>
    </>
  );
}


const styles = {

  container: {
    maxWidth: '400px',
    margin: '0 auto',
    marginTop: '120px',
    padding: '20px',
    backgroundColor: '#f4f4f4',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  title: {
    color: 'navy',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '20px',
  },
  label: {
    marginBottom: '5px',
    marginRight: '42px',
  },
  label2: {
    marginBottom: '5px',
    marginRight: '20px',
  },
  input: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
  },
  button: {
    backgroundColor: 'navy',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
};

export default LoginForm;
