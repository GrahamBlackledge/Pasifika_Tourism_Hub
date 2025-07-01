import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL   // http://localhost:5000/api
});


export const getCountry = slug => api.get(`/countries/slug/${slug}`);

export const deleteActivity = (slug, id) =>
  api.delete(`/countries/slug/${slug}/activities/${id}`);