import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css'; // Importing the custom CSS file

const UserDashboard = () => {
  const navigate = useNavigate();

  const handleAddClient = () => {
    navigate('/addCar');
  };

  const handleShowClients = () => {
    navigate('/cars/showCars');
  };

  return (
    <div className="homepage-container d-flex align-items-center justify-content-center ">
      <div className="homepage-content">
      <h2 className="text-center display-4 mb-4 homepage-content">Welcome to the User Dashboard</h2>
      <div className="button-group text-center">
        <button className="btn btn-primary mx-2" onClick={handleAddClient}>
          Add Car
        </button>
        <button className="btn btn-secondary mx-2" onClick={handleShowClients}>
          Show Cars
        </button>
      </div>
      </div>
    </div>
  );
};

export default UserDashboard;
