import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css'; // Import the custom CSS file

const HomePage = () => {
  return (
    <div className="homepage-container d-flex align-items-center justify-content-center">
      <div className="text-center homepage-content">
        <h1 className="display-4 mb-4">Welcome to the Car management System</h1>
        <p className="lead mb-5">CRUD app for managing your car database with authentication</p>
        <div className="button-group">
          <Link to="/login" className="btn btn-primary btn-lg mx-2">Login</Link>
          <Link to="/signup" className="btn btn-secondary btn-lg mx-2">Signup</Link>
        </div>
      </div>
    </div>
  );
};


export default HomePage;
