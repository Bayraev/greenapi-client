import axios from 'axios';
// import Cookies from 'js-cookie';

export const apiUrl = `https://7105.api.greenapi.com`;

const $api = axios.create({
  withCredentials: true, // it makes automatically connecting cookies to every request from client
  baseURL: apiUrl, // base url (maybe better put it in .env)
});

//* interceptors for request
$api.interceptors.request.use((config) => {
  // it have all base urls, headers etc., to get something or send something as request
  return config;
});

//
export default $api;
