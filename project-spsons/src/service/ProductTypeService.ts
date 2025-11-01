import axios from 'axios';
import { ProductType } from '../models/ProductType';
import { BASE_URL } from '../config';

const API_URL = `${BASE_URL}/api/producttypes`;

export const getAllProductTypes = async (): Promise<ProductType[]> => {
  const response = await axios.get<ProductType[]>(API_URL);
  return response.data;
};