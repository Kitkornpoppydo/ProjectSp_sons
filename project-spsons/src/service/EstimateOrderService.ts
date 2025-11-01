import axios from "axios";
import {
  EstimatePreviewRequest,
  EstimatePreviewResponse,
  EstimateOrderRequest,
  EstimateOrderResponse,
} from "../models/EstimateModels";
import { BASE_URL } from "../config";

const API_BASE = `${BASE_URL}/api/EstimateOrders`;

export async function previewEstimate(
  data: EstimatePreviewRequest
): Promise<EstimatePreviewResponse> {
  const response = await axios.post<EstimatePreviewResponse>(
    `${API_BASE}/preview`,
    data
  );
  return response.data;
}

export async function createEstimateOrder(
  data: EstimateOrderRequest
): Promise<EstimateOrderResponse> {
  const response = await axios.post<EstimateOrderResponse>(API_BASE, data);
  return response.data;
}
