'use client';

import React from 'react';

interface RangeSliderProps {
  label: string;
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  color: 'blue' | 'green' | 'purple';
}

const colorClasses = {
  blue: 'from-blue-200 to-blue-400 accent-blue-600',
  green: 'from-green-200 to-green-400 accent-green-600',
  purple: 'from-purple-200 to-purple-400 accent-purple-600',
};

export function RangeSlider({ label, min, max, value, onChange, color }: RangeSliderProps) {
  return (
    <div>
      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>
      <div className="space-y-2">
        <input
          type="range"
          min={min}
          max={max}
          value={value[0]}
          onChange={e => onChange([parseInt(e.target.value), value[1]])}
          className={`w-full h-2 bg-gradient-to-r ${colorClasses[color]} rounded-lg appearance-none cursor-pointer`}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={value[1]}
          onChange={e => onChange([value[0], parseInt(e.target.value)])}
          className={`w-full h-2 bg-gradient-to-r ${colorClasses[color]} rounded-lg appearance-none cursor-pointer`}
        />
        <div className="text-xs text-gray-600 text-center">
          {value[0]} — {value[1]}
        </div>
      </div>
    </div>
  );
}
