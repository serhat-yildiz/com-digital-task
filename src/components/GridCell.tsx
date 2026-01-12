'use client';

import React from 'react';
import { SCORE_LABELS } from '@/constants';

interface GridCellProps {
  x: number;
  y: number;
  items: Array<{ id: number; frequency: number }>;
  selectedIds: Set<number>;
  onToggleSelection: (id: number) => void;
}

export function GridCell({ x, y, items, selectedIds, onToggleSelection }: GridCellProps) {
  return (
    <div className="flex-1 border border-gray-200 hover:border-blue-400 hover:shadow-md rounded p-1 sm:p-2 bg-gradient-to-br from-gray-50 to-gray-100 min-h-16 sm:min-h-24 overflow-y-auto hover:bg-blue-50 transition-all duration-200">
      {/* Cell header */}
      <div className="text-xs font-bold text-gray-500 mb-1">
        ({x}, {y})
      </div>

      {/* Items in cell */}
      <div className="flex flex-col gap-1">
        {items.slice(0, 3).map(item => (
          <div
            key={item.id}
            onClick={() => onToggleSelection(item.id)}
            className={`p-1 rounded text-xs cursor-pointer transition-all duration-150 transform hover:scale-105 ${
              selectedIds.has(item.id)
                ? 'bg-blue-500 text-white shadow-md scale-105'
                : 'bg-white border border-gray-300 text-gray-700 hover:border-blue-400 hover:shadow-sm'
            }`}
          >
            <div className="font-bold text-xs">#{item.id}</div>
            <div className="text-xs opacity-75 line-clamp-1">
              F:{item.frequency}
            </div>
          </div>
        ))}
        {items.length > 3 && (
          <div className="text-xs text-gray-500 text-center italic pt-1">
            +{items.length - 3} daha
          </div>
        )}
      </div>
    </div>
  );
}
