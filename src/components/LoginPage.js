import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import '../styles/styles.css'; 

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      // Navigate to the dashboard after successful login
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="container mt-5 box-width">
      <h2 className="text-center mb-4">Login</h2>
      <form onSubmit={handleLogin} className="border p-4 rounded shadow">
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            className="form-control"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" className="btn btn-info btn-block">Login</button>
        <div>
          <p> 
          Don't have an account? <Link to="/signup">Sign up here!</Link>
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
  inputGroup: {
    marginBottom: '15px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
};

export default LoginPage;
