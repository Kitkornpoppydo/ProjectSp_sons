import axios from 'axios';
import { Product } from '../models/Product';
import { BASE_URL } from '../config';

const API_URL = `${BASE_URL}/api/products`;

export const getAllProducts = async (): Promise<Product[]> => {
  const response = await axios.get(API_URL);
  return response.data.map((p: any) => ({
    id: p.id,
    name: p.name,
    pricePerUnit: p.price_per_unit,
    unit: p.unit,
    color: p.color,
    image: p.image,
    categoryId: p.category_id,
    categoryName: p.category_name,
  }));
};
