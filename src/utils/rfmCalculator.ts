export interface RFMData {
  id: number;
  recency: number;
  frequency: number;
  monetary: number;
}

export interface RFMScore {
  id: number;
  recency: number;
  frequency: number;
  monetary: number;
  recencyScore: number;
  frequencyScore: number;
  monetaryScore: number;
  x: number; // frequency score (1-5)
  y: number; // monetary score (1-5)
}

/**
 * Calculate percentile rank for a value in an array
 */
export function calculatePercentileRank(value: number, array: number[]): number {
  const sorted = [...array].sort((a, b) => a - b);
  const count = array.length;
  const index = sorted.indexOf(value);
  return (index / count) * 100;
}

/**
 * Convert percentile to score (1-5)
 */
export function percentileToScore(percentile: number): number {
  if (percentile <= 20) return 1;
  if (percentile <= 40) return 2;
  if (percentile <= 60) return 3;
  if (percentile <= 80) return 4;
  return 5;
}

/**
 * Calculate RFM scores for all customers
 */
export function calculateRFMScores(data: RFMData[]): RFMScore[] {
  const recencyValues = data.map(d => d.recency);
  const frequencyValues = data.map(d => d.frequency);
  const monetaryValues = data.map(d => d.monetary);

  return data.map(customer => {
    // For recency, lower is better (more recent)
    const recencyPercentile = 100 - calculatePercentileRank(customer.recency, recencyValues);
    const recencyScore = percentileToScore(recencyPercentile);

    // For frequency, higher is better
    const frequencyPercentile = calculatePercentileRank(customer.frequency, frequencyValues);
    const frequencyScore = percentileToScore(frequencyPercentile);

    // For monetary, higher is better
    const monetaryPercentile = calculatePercentileRank(customer.monetary, monetaryValues);
    const monetaryScore = percentileToScore(monetaryPercentile);

    return {
      ...customer,
      recencyScore,
      frequencyScore,
      monetaryScore,
      x: frequencyScore,
      y: monetaryScore,
    };
  });
}

/**
 * Filter RFM scores by criteria
 */
export function filterRFMScores(
  scores: RFMScore[],
  recencyMin?: number,
  recencyMax?: number,
  frequencyMin?: number,
  frequencyMax?: number,
  monetaryMin?: number,
  monetaryMax?: number
): RFMScore[] {
  return scores.filter(score => {
    if (recencyMin !== undefined && score.recencyScore < recencyMin) return false;
    if (recencyMax !== undefined && score.recencyScore > recencyMax) return false;
    if (frequencyMin !== undefined && score.frequencyScore < frequencyMin) return false;
    if (frequencyMax !== undefined && score.frequencyScore > frequencyMax) return false;
    if (monetaryMin !== undefined && score.monetaryScore < monetaryMin) return false;
    if (monetaryMax !== undefined && score.monetaryScore > monetaryMax) return false;
    return true;
  });
}

/**
 * Get grid position label for a score
 */
export function getGridLabel(score: number): string {
  switch (score) {
    case 1:
      return 'Low';
    case 2:
      return 'Low-Med';
    case 3:
      return 'Medium';
    case 4:
      return 'Med-High';
    case 5:
      return 'High';
    default:
      return 'Unknown';
  }
}
