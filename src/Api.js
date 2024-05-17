import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

const Api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to fetch data from the server
export const fetchData = async (endpoint) => {
  try {
    const response = await Api.get(endpoint);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching data from ${endpoint}: ${error.message}`);
  }
};

// Function to send data to the server
export const sendData = async (endpoint, data) => {
  try {
    const response = await Api.post(endpoint, data);
    return response.data;
  } catch (error) {
    throw new Error(`Error sending data to ${endpoint}: ${error.message}`);
  }
};

// Add other functions for different types of requests (e.g., PUT, DELETE) as needed

export default Api;