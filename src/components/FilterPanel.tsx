'use client';

import React from 'react';
import { RangeSlider } from './RangeSlider';

interface FilterPanelProps {
  recency: [number, number];
  frequency: [number, number];
  monetary: [number, number];
  onRecencyChange: (range: [number, number]) => void;
  onFrequencyChange: (range: [number, number]) => void;
  onMonetaryChange: (range: [number, number]) => void;
}

export function FilterPanel({
  recency,
  frequency,
  monetary,
  onRecencyChange,
  onFrequencyChange,
  onMonetaryChange,
}: FilterPanelProps) {
  return (
    <div className="bg-white rounded-lg sm:rounded-xl shadow-sm sm:shadow-md p-4 sm:p-6 mb-4 sm:mb-6 border border-gray-100">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Filtreler</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <RangeSlider
          label="Recency Skoru"
          min={1}
          max={5}
          value={recency}
          onChange={onRecencyChange}
          color="blue"
        />
        <RangeSlider
          label="Frequency Skoru"
          min={1}
          max={5}
          value={frequency}
          onChange={onFrequencyChange}
          color="green"
        />
        <RangeSlider
          label="Monetary Skoru"
          min={1}
          max={5}
          value={monetary}
          onChange={onMonetaryChange}
          color="purple"
        />
      </div>
    </div>
  );
}
