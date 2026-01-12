export interface RFMData {
  id: number;
  recency: number;
  frequency: number;
  monetary: number;
}

export interface RFMScore extends RFMData {
  recencyScore: number;
  frequencyScore: number;
  monetaryScore: number;
  x: number;
  y: number;
}

export interface GridCell {
  x: number;
  y: number;
  items: RFMScore[];
}

export interface FilterRange {
  min: number;
  max: number;
}

export interface APIResponse {
  success: boolean;
  message: string;
  selectedIds: number[];
  timestamp: string;
  processingTime: string;
}
