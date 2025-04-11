import axios from "axios";
import { TMDB_API_KEY, TMDB_BASE_URL } from "@env";
const axiosInstance = axios.create({
  baseURL: TMDB_BASE_URL,
  timeout: 8000,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TMDB_API_KEY}`,
  },
});

export default axiosInstance;
