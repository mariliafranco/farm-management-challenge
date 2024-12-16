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

export const addFarm = async (): Promise<Farm[]> => {
  const response = await axios.post<Farm[]>(`${API_BASE_URL}/farms`);

  return response;
};

export const deleteFarm = async (id: string): Promise<Farm> => {
  const response = await axios.delete<Farm[]>(`${API_BASE_URL}/farms/${id}`);

  return response;
};

export const updateFarm = async (id: string): Promise<Farm> => {
  const response = await axios.put<Farm[]>(`${API_BASE_URL}/farms/${id}`);

  return response;
};
