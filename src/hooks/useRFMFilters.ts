'use client';

import { useState, useCallback } from 'react';

export interface FilterState {
  recency: [number, number];
  frequency: [number, number];
  monetary: [number, number];
}

const defaultFilters: FilterState = {
  recency: [1, 5],
  frequency: [1, 5],
  monetary: [1, 5],
};

export function useRFMFilters() {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  const updateRecencyFilter = useCallback((range: [number, number]) => {
    setFilters(prev => ({ ...prev, recency: range }));
  }, []);

  const updateFrequencyFilter = useCallback((range: [number, number]) => {
    setFilters(prev => ({ ...prev, frequency: range }));
  }, []);

  const updateMonetaryFilter = useCallback((range: [number, number]) => {
    setFilters(prev => ({ ...prev, monetary: range }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  return {
    filters,
    updateRecencyFilter,
    updateFrequencyFilter,
    updateMonetaryFilter,
    resetFilters,
  };
}
