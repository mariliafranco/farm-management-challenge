import axios from "axios";

const API_BASE_URL = "http://localhost:3001";

export const getFarms = async () => {
  const response = await axios.get(`${API_BASE_URL}/farms`);

  return response.data;
};
