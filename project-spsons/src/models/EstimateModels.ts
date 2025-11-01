export interface EstimateItem {
  productId: number;
  width: number;
  height: number;
}

export interface EstimatePreviewRequest {
  items: EstimateItem[];
}

export interface EstimatePreviewResponse {
  totalYard: number;
  totalFabricPrice: number;
  totalLaborPrice: number;
  totalPrice: number;
}

export interface CustomerInfo {
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  customerAddress?: string;
}

export interface EstimateOrderRequest {
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  customerAddress?: string;
  items: EstimateItem[];
}

export interface EstimateOrderResponse {
  orderId: number;
}
