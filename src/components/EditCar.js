import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CarService from '../services/CarService'; // Assuming CarService is correctly imported
import '../styles/styles.css';

const EditCarForm = () => {
  const navigate = useNavigate();
  const { carId } = useParams(); // Get carId from the URL
  const [carData, setCarData] = useState({
    title: '',
    description: '',
    tags: '',
  });
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const car = await CarService.getCarById(carId); // Fetch the existing car details
        setCarData({
          title: car.title,
          description: car.description,
          tags: car.tags.join(', '), // Assuming tags is an array
        });
        setExistingImages(car.images); // Assuming car.images is an array of existing image URLs
      } catch (err) {
        setError('Error fetching car details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [carId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData({ ...carData, [name]: value });
  };

  const handleImageChange = (e) => {
    setImages(e.target.files); // Update selected images
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if title, description, and tags are not empty before appending them
    if (!carData.title || !carData.description || !carData.tags) {
      setError('All fields are required');
      return;
    }
  
    // Create FormData object to send data
    const formData = new FormData();
    
    // Append title, description, and tags
    console.log("card details printed after editing")
    formData.append('title', carData.title);
    formData.append('description', carData.description);
    // Tags: convert comma-separated string to an array and append
    formData.append('tags', carData.tags); 
    formData.forEach((value, key) => {
        console.log(key + ": " + value);
      });
    // Append existing images if they exist
  
    // Append newly selected images
    if (images.length > 0) {
      if (images.length > 10) {
        alert("More than 10 photos")
        navigate(`/cars/${carId}`);
        return;
      } else {
        for (let i = 0; i < images.length; i++) {
          formData.append('images', images[i]);
        }
      }
    } else {
        existingImages.forEach((image) => formData.append('existingImages', image));
    }
  
    try {
        console.log("printing again")
        formData.forEach((value, key) => {
            console.log(key + ": " + value);
          });
      // Send the form data to the carService to update the car
      const response = await CarService.editCar(carId, formData);
      alert('Car updated successfully');
      navigate(`/cars/${carId}`); // Navigate to the updated car details page
      return;
    } catch (error) {
      setError('Error updating car');
      console.error(error);
    }
  };
  
  if (loading) return <p>Loading...</p>;
  

  return (
    <div className="container mt-5 box-width">
      <h2 className="text-center mb-4">Edit Car</h2>
      <form onSubmit={handleSubmit} className="border p-4 rounded shadow">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            className="form-control"
            placeholder="Enter car title"
            value={carData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            className="form-control"
            placeholder="Enter description"
            value={carData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="tags">Tags</label>
          <input
            type="text"
            name="tags"
            id="tags"
            className="form-control"
            placeholder="Enter tags (comma-separated)"
            value={carData.tags}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="images">Images</label>
          <input
            type="file"
            name="images"
            id="images"
            className="form-control"
            multiple
            onChange={handleImageChange}
          />
          <small className="form-text text-muted">
            {existingImages.length > 0
              ? `Existing images: ${existingImages.length}`
              : 'No existing images'}
          </small>
        </div>
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" className="btn btn-info btn-block">
          Update Car
        </button>
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

export default EditCarForm;
