import axios from "axios";
import { CropType, Farm } from "../types/Farm";

const API_BASE_URL = "http://localhost:3001";

interface GetFarmsParams {
  search?: string;
}

export const getFarms = async ({ search }: GetFarmsParams = {}): Promise<
  Farm[]
> => {
  try {
    const response = await axios.get<Farm[]>(`${API_BASE_URL}/farms`, {
      params: {
        _sort: "createdAt",
        _order: "desc",
        q: search || "",
      },
    });
    return response.data;
  } catch (error: unknown) {
    console.error("Error fetching farms:", error);
    throw error;
  }
};

export const getCropTypes = async (): Promise<CropType[]> => {
  try {
    const response = await axios.get<CropType[]>(`${API_BASE_URL}/crop-types`);
    return response.data;
  } catch (error: unknown) {
    console.error("Error fetching crops:", error);
    throw error;
  }
};

export const addFarm = async (newFarm: Omit<Farm, "id">) => {
  try {
    const response = await axios.post<Farm>(`${API_BASE_URL}/farms`, newFarm);
    console.log("New farm created!", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("Error creating farm:", error);
    throw error;
  }
};

export const deleteFarm = async (id: string): Promise<void> => {
  await axios.delete<Farm>(`${API_BASE_URL}/farms/${id}`);
};
