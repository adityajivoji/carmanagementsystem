import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // useHistory for navigation
import CarService from '../services/CarService'; // Assuming this service fetches car details
import '../styles/CarDetails.css'; // CSS for styling the car detail page

const CarDetail = () => {
  const { carId } = useParams(); // Get carId from the URL
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        console.log("this is carId")
        console.log(carId)
        const carData = await CarService.getCarById(carId); // Get the car data by ID
        console.log(carData)
        console.log(carData.tags);
        console.log(typeof carData.tags);

        setCar(carData);
      } catch (err) {
        setError('Error fetching car details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [carId]); // Re-run the effect if carId changes

  const handleDelete = async () => {
    try {
      await CarService.deleteCar(carId); // Assuming deleteCar is implemented in your service
      navigate('/cars/Showcars'); // Redirect to the Showcars page after deletion
    } catch (err) {
      setError('Error deleting car');
      console.error(err);
    }
  };

  const handleEdit = () => {
    navigate(`/cars/edit/${carId}`); // Navigate to the edit page for this car
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="car-detail-container">
      {car ? (
        <>
          <h2>{car.title}</h2>
          <p><strong>Description:</strong> {car.description}</p>
          <p><strong>Tags:</strong> {car.tags.map(tag => tag.trim()).join(', ')}</p>

          <div className="car-images">
            {car.images.length > 0 ? (
              car.images.map((image, index) => (
                <img key={index} src={image} alt={`Car image ${index + 1}`} className="car-image" />
              ))
            ) : (
              <p>No images available.</p>
            )}
          </div>

          <div className="car-detail-actions">
            <button onClick={handleEdit} className="edit-btn">Edit</button>
            <button onClick={handleDelete} className="delete-btn">Delete</button>
          </div>
        </>
      ) : (
        <p>Car details not found.</p>
      )}
    </div>
  );
};

export default CarDetail;
