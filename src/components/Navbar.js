import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import '../styles/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  // Check if the user is logged in by verifying the existence of the JWT token
  const isLoggedIn = !!localStorage.getItem('jwtToken');

  // Logout function to remove the token from local storage and redirect
  const handleLogout = () => {
    localStorage.removeItem('jwtToken');  // Remove JWT token
    navigate('/');  // Redirect to the homepage or login page after logout
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container">
        {isLoggedIn ? (
          <Link className="navbar-brand" to="/dashboard">
          Car management System
        </Link>
        ) : 
        <Link className="navbar-brand" to="/">
          Car management System
        </Link>}
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          {isLoggedIn ? (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">
                  User Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/addCar">
                  Add Car
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cars/showCars">
                  Show Cars
                </Link>
              </li>
              <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
