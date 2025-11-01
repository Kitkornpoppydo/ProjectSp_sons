import axios from 'axios';
import { ProductCategory } from '../models/ProductCategory';
import { BASE_URL } from '../config';

const API_URL = `${BASE_URL}/api/productcategories/push-product`;

export const getAllProductCategories = async (): Promise<ProductCategory[]> => {
  const response = await axios.get<ProductCategory[]>(API_URL);
  return response.data;
};
