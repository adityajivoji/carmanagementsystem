import axios from 'axios';

const API_URL = 'https://carmanagementsystembackend.onrender.com/api/cars';

const getAuthHeader = () => {
  const token = localStorage.getItem('jwtToken');
  return { Authorization: `${token}` };
};

const CarService = {
  // Function to add a new car
  addCar: async (carData) => {
    try {
      console.log(carData)
      const response = await axios.post(`${API_URL}/addCar`, carData, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      console.error('Error adding car', error);
      throw error;
    }
  },

  // Function to fetch all cars
  getAllCars: async () => {
    try {
      const response = await axios.get(`${API_URL}/listCars`, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching cars', error);
      throw error;
    }
  },

  // Function to get individual car details by ID
  getCarById: async (carId) => {
    try {
      const response = await axios.get(`${API_URL}/cars/${carId}`, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching car details', error);
      throw error;
    }
  },
  deleteCar: async (carId) => {
    try {
      const response = await axios.delete(`${API_URL}/cars/${carId}`, {
        headers: getAuthHeader(),
      });
      return response.data; // Assuming the API returns a success message or confirmation
    } catch (error) {
      throw new Error('Error deleting car');
    }
  },
  
  // Update car details
  editCar: async (carId, carData) => {
    try {
      console.log("logging the updated data")
      carData.forEach((value, key) => {
        console.log(key + ": " + value);
      });
      console.log(carId)
      console.log("this is car id")
      const response = await axios.put(`${API_URL}/cars/${carId}`, carData, {
        headers: getAuthHeader(),
      });
      return response.data; // Assuming the API returns the updated car data
    } catch (error) {
      throw new Error('Error updating car');
    }
  },
};

export default CarService;
