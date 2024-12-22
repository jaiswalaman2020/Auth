// console.log(import.meta.env.MODE === "development");

import axios from "axios";
const API_URL = "http://localhost:8000/api/auth";

axios.defaults.withCredentials = true;

const signup = async (email, password, name) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, {
      email,
      password,
      name,
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

// signup("jaiswalaman2020@gmail.com", "password", "Aman Jaiswal");

const verify = async (code) => {
  try {
    const response = await axios.post(`${API_URL}/verify-email`, { code });
    console.log(response);
  } catch (error) {
    throw error;
  }
};

verify("741307");
