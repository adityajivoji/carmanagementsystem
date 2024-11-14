import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import UserDashboard from './components/UserDashboard';
import SignupPage from './components/SignupPage';
import AddCarForm from './components/AddCarForm';
import ShowCars from './components/ShowCars';
// import CarDashboard from './components/CarDashboard';
import Navbar from './components/Navbar'; // Import the Navbar
import CarDetail from './components/CarDetail';
import EditCar from './components/EditCar';


const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('jwtToken');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<PrivateRoute><UserDashboard /></PrivateRoute>} />
        <Route path="/addCar" element={<PrivateRoute><AddCarForm /></PrivateRoute>} />
        <Route path="/cars/Showcars" element={<PrivateRoute><ShowCars /></PrivateRoute>} />
        <Route path="/cars/:carId" element={<PrivateRoute><CarDetail /></PrivateRoute>} />
        <Route path="/cars/edit/:carId" element={<PrivateRoute><EditCar /></PrivateRoute>} />
        {/* <Route path="/client/:clientId" element={<PrivateRoute><CarDashboard /></PrivateRoute>} /> */}
      </Routes>
    </Router>
  );
}

export default App;
