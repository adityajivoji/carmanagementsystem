import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../services/authService';
import '../styles/styles.css'; 

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    if (!formData.username) errors.username = 'Username is required';
    if (!formData.password) errors.password = 'Password is required';

    setErrors(errors);
    return Object.keys(errors).length === 0;  // Return true if no errors
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    try {
      const response = await signup(formData);
      alert(response.message);  // Use the message from the response
      navigate('/login');  // Redirect to login page on success
    } catch (error) {
      alert(error.message || 'Signup failed, please try again');
    }
  };
  

  return (
    <div className="container mt-5 box-width">
      <h2 className="text-center mb-4">Signup</h2>
      <form onSubmit={handleSubmit} className="border p-4 rounded shadow">
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            className="form-control"
            placeholder="Enter Username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <p style={styles.error}>{errors.username}</p>}
        </div>
        <div style={{marginTop:'15px'}}>
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p style={styles.error}>{errors.password}</p>}
        </div>
        
        <button type="submit" className="btn btn-info btn-block" style={{marginTop:'15px'}}>Signup</button>
        <div>
          <p> 
          Already have an account? <Link to="/login">Log in here</Link>
          </p>
      </div>
      </form>
      
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
  },
  form: {
    display: 'inline-block',
    textAlign: 'left',
  },
  error: {
    color: 'red',
    fontSize: '12px',
  },
  button: {
    marginTop: '10px',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
  },
};

export default SignupPage;
