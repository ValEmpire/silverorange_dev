import initAxios from 'axios';

// and add baseURL
export const axios = initAxios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});
