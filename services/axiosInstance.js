import axios from "axios";

const BACKEND = process.env.NEXT_PUBLIC_API_BASE_URL;
const axiosInstance = axios.create({
  baseURL: BACKEND,
  headers: {
    "Content-Type": "application/json",
  },
  validateStatus: () => true,
});

export default axiosInstance;
