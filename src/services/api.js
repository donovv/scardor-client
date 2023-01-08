import axios from 'axios';

const api = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_API_URL,
});

export default async function makeRequest(url, options) {
  return api(url, options)
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
      Promise.reject(error?.response?.data?.message ?? 'Error');
    });
}
