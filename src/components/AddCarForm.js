import React, { useState } from 'react';
import CarService from '../services/CarService'; // Assuming CarService is correctly imported
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css';

const AddCarForm = () => {
  const navigate = useNavigate();
  const [carData, setCarData] = useState({
    title: '',
    description: '',
    tags: '',
  });
  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData({ ...carData, [name]: value });
  };

  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', carData.title);
    formData.append('description', carData.description);
    console.log(carData.tags)
    formData.append('tags', carData.tags); // Convert tags string to array
    if (images.length > 10) {
      alert("More than 10 photos")
    } else {
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
      }
    }

    try {
      console.log("sending form to service")
      console.log(formData)
      const response = await CarService.addCar(formData);
      alert('Car added successfully');
      navigate('/cars/showcars');
    } catch (error) {
      console.error('Error adding car', error);
    }
  };

  return (
    <div className="container mt-5 box-width">
      <h2 className="text-center mb-4">Add Car</h2>
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
        </div>
        <button type="submit" className="btn btn-info btn-block">Add Car</button>
      </form>
    </div>
  );
};

export default AddCarForm;
