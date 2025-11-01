import axios from 'axios';
import { BASE_URL } from '../config';
import { Portfolio } from '../models/Portfolio';
import { PortfolioImage } from '../models/PortfolioImage';

const API_URL = `${BASE_URL}/api/Portfolio`; 

export const getAllPortfolios = async (): Promise<Portfolio[]> => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const getPortfolioWithImages = async (id: number): Promise<{ portfolio: Portfolio, images: PortfolioImage[] }> => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

export const createPortfolio = async (portfolio: { project_name: string; description?: string }) => {
  const res = await axios.post(API_URL, portfolio);
  return res.data;
};

export const uploadMultipleImages = async (files: File[], portfolio_id: number) => {
  const formData = new FormData();
  files.forEach(file => formData.append("files", file));
  formData.append("portfolio_id", portfolio_id.toString());

  const res = await axios.post(`${API_URL}/upload-multiple`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return res.data;
};
