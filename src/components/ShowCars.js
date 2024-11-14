import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CarService from '../services/CarService';
import '../styles/ShowCars.css';
import '../styles/styles.css'; 
// Importing the custom CSS file

const ShowCars = () => {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State to store search input
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await CarService.getAllCars();
        console.log("dataincoming")
        console.log(data)
        setCars(data);
      } catch (error) {
        console.error('Error fetching cars', error);
      }
    };
    fetchCars();
  }, []);

  const handleCarClick = (carId) => {
    navigate(`/cars/${carId}`);
  };

  // Filter cars based on the search term
  const filteredCars = cars.filter((car) =>
    car.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (Array.isArray(car.tags) && car.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
  );
  

  return (
<div className="box-width">
  <h2 className="text-center">Your Cars</h2>

  {/* Search bar */}
  <input
    type="text"
    placeholder="Search cars by name"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="search-bar"
  />

  <div className="car-cards">
    {filteredCars.length > 0 ? (
      filteredCars.map((car) => (
        <div
          key={car._id}
          className="car-card"
          onClick={() => handleCarClick(car._id)}
        >
          <div className="car-details">
            <h3>{car.title}</h3>
            <p>Description: {car.description}</p>
            <p>Tags: {car.tags.map(tag => tag.trim()).join(', ')}</p>
          </div>
          {car.images.length > 0 && (
            <img
              src={car.images[0]}
              alt={`${car.title} image`}
              className="car-image"
            />
          )}
        </div>
      ))
    ) : (
      <p>No cars found.</p>
    )}
  </div>
</div>

  );
};

export default ShowCars;
