import axios from "axios";

export const apiAxios = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 5000,
  headers: {
    Authorization: `Bearer ${
      JSON.parse(localStorage.getItem("user")) !== null
        ? JSON.parse(localStorage.getItem("user")).token
        : ""
    }`,
    "Content-Type": "application/json"
  }
});
