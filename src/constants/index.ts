export const SCORE_LABELS = {
  1: 'Düşük',
  2: 'Az-Orta',
  3: 'Orta',
  4: 'Orta-Yüksek',
  5: 'Yüksek',
} as const;

export const GRID_SIZE = 5;

export const PERCENTILE_THRESHOLDS = {
  low: 20,
  lowMed: 40,
  medium: 60,
  medHigh: 80,
  high: 100,
} as const;

export const COLORS = {
  recency: 'blue',
  frequency: 'green',
  monetary: 'purple',
} as const;
