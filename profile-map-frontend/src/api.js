import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL

export const getProfiles = async () => axios.get(`${API_URL}/get/profiles`);
export const getProfileById = async (id) => axios.get(`${API_URL}/profiles/${id}`);
export const createProfile = async (formData) => {
  const token = localStorage.getItem("token");
  return axios.post(`${API_URL}/profiles`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: token,
    },
  });
};
  


export const getProfile = async (id) => {
  const response = await axios.get(`${API_URL}/profiles/get/${id}`);
  return response.data;
};

export const updateProfile = async (id, data) => {
  const token = localStorage.getItem("token");
  return axios.put(`${API_URL}/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteProfile = async (id) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No authentication token found.");
    return;
  }

  try {
    const response = await axios.delete(`${API_URL}/profiles/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting profile:", error.response?.data || error.message);
    throw error;
  }
};
