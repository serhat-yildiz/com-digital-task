'use client';

import React from 'react';
import { GridCell } from './GridCell';
import { GRID_SIZE, SCORE_LABELS } from '@/constants';
import { GridCell as GridCellType, RFMScore } from '@/types';

interface GridDisplayProps {
  gridCells: GridCellType[];
  selectedIds: Set<number>;
  onToggleSelection: (id: number) => void;
}

export function GridDisplay({ gridCells, selectedIds, onToggleSelection }: GridDisplayProps) {
  return (
    <div className="bg-white rounded-lg sm:rounded-xl shadow-sm sm:shadow-md overflow-hidden border border-gray-100">
      <div className="p-3 sm:p-6 overflow-x-auto">
        {/* Y-axis labels and grid */}
        <div className="flex gap-1 sm:gap-2">
          {/* Y-axis */}
          <div className="flex flex-col justify-between pr-2 sm:pr-4 pt-6 sm:pt-8 flex-shrink-0" style={{ width: '40px' }}>
            {Array.from({ length: GRID_SIZE }, (_, i) => GRID_SIZE - i).map(y => (
              <div
                key={y}
                className="text-xs sm:text-sm font-semibold text-gray-600 text-center h-16 sm:h-24 flex items-center justify-center"
              >
                {SCORE_LABELS[y as keyof typeof SCORE_LABELS]}
              </div>
            ))}
          </div>

          {/* Grid cells */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col">
              {/* Grid rows */}
              {Array.from({ length: GRID_SIZE }, (_, i) => GRID_SIZE - i).map(y => (
                <div key={`row-${y}`} className="flex flex-1 gap-1 sm:gap-2">
                  {Array.from({ length: GRID_SIZE }, (_, i) => i + 1).map(x => {
                    const cell = gridCells.find(c => c.x === x && c.y === y);
                    if (!cell) return null;

                    return (
                      <GridCell
                        key={`${x}-${y}`}
                        x={x}
                        y={y}
                        items={cell.items}
                        selectedIds={selectedIds}
                        onToggleSelection={onToggleSelection}
                      />
                    );
                  })}
                </div>
              ))}

              {/* X-axis labels */}
              <div className="flex mt-2 sm:mt-4">
                <div style={{ width: '40px' }} className="flex-shrink-0"></div>
                <div className="flex-1 flex gap-1 sm:gap-2">
                  {Array.from({ length: GRID_SIZE }, (_, i) => i + 1).map(x => (
                    <div key={`x-${x}`} className="flex-1 text-center text-xs sm:text-sm font-bold text-gray-600">
                      {SCORE_LABELS[x as keyof typeof SCORE_LABELS]}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Axis labels */}
        <div className="mt-3 sm:mt-4 text-center">
          <div className="text-xs sm:text-sm text-gray-600 font-semibold">
            X Ekseni: Frequency | Y Ekseni: Monetary
          </div>
        </div>
      </div>
    </div>
  );
}
