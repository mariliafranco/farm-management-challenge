import axios from "axios";
import { CropType, Farm } from "../types/Farm";

const API_BASE_URL = "http://localhost:3001";

export const getFarms = async (): Promise<Farm[]> => {
  const response = await axios.get<Farm[]>(`${API_BASE_URL}/farms`);

  return response.data;
};

export const getCropTypes = async (): Promise<CropType[]> => {
  const response = await axios.get<CropType[]>(`${API_BASE_URL}/crop-types`);

  return response.data;
};
