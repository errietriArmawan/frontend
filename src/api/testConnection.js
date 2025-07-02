// src/api/testBackendConnection.js
import apiClient from './axiosConfig';

export const testBackendConnection = async () => {
  try {
    const response = await apiClient.get('/health'); // Ini akan menjadi http://localhost:5000/api/health

    console.log("Raw response:", response);

    if (response.data && response.status === 200) {
      return response.data;
    }

    throw new Error("Format response tidak valid");
  } catch (error) {
    console.error("Detail error:", {
      config: error.config,
      response: error.response,
      message: error.message
    });
    throw error;
  }
};
