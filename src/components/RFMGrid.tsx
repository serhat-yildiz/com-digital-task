'use client';

import React, { useState, useEffect } from 'react';
import { FilterPanel } from './FilterPanel';
import { GridDisplay } from './GridDisplay';
import { ControlPanel } from './ControlPanel';
import { Legend } from './Legend';
import { useRFMFilters } from '@/hooks/useRFMFilters';
import { useSelection } from '@/hooks/useSelection';
import { useAPI } from '@/hooks/useAPI';
import { calculateRFMScores, filterRFMScores, getGridLabel } from '@/utils/rfmCalculator';
import { GRID_SIZE } from '@/constants';
import { GridCell, RFMScore, RFMData } from '@/types';

export default function RFMGrid() {
  const [rfmScores, setRfmScores] = useState<RFMScore[]>([]);
  const [filteredScores, setFilteredScores] = useState<RFMScore[]>([]);
  const [loading, setLoading] = useState(true);

  // Use custom hooks
  const filters = useRFMFilters();
  const selection = useSelection();
  const api = useAPI();

  // Load and process data
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/data.json');
        const data: RFMData[] = await response.json();
        const scores = calculateRFMScores(data);
        setRfmScores(scores);
        setFilteredScores(scores);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Apply filters when filter values or scores change
  useEffect(() => {
    const filtered = filterRFMScores(
      rfmScores,
      filters.filters.recency[0],
      filters.filters.recency[1],
      filters.filters.frequency[0],
      filters.filters.frequency[1],
      filters.filters.monetary[0],
      filters.filters.monetary[1]
    );
    setFilteredScores(filtered);
    selection.deselectAll(); // Clear selection when filter changes
  }, [filters.filters.recency, filters.filters.frequency, filters.filters.monetary, rfmScores]);

  // Build grid cells
  const gridCells: GridCell[] = [];
  for (let y = 5; y >= 1; y--) {
    for (let x = 1; x <= 5; x++) {
      const items = filteredScores.filter(score => score.x === x && score.y === y);
      gridCells.push({ x, y, items });
    }
  }

  // Handle API submission
  const handleSubmit = async () => {
    if (selection.selectedIds.size === 0) {
      alert('Lütfen en az bir öğe seçin');
      return;
    }
    await api.submitSelectedIds(Array.from(selection.selectedIds));
  }

  if (loading) {
    return <div className="p-8 text-center">RFM verileri yükleniyor...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            RFM Müşteri Segmentasyonu
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Müşterileri satın alma davranışlarına göre 5×5 grid'de segmentlendir
          </p>
        </div>

        {/* Filters Component */}
        <FilterPanel
          recency={filters.filters.recency}
          frequency={filters.filters.frequency}
          monetary={filters.filters.monetary}
          onRecencyChange={filters.updateRecencyFilter}
          onFrequencyChange={filters.updateFrequencyFilter}
          onMonetaryChange={filters.updateMonetaryFilter}
        />

        {/* Control Panel Component */}
        <ControlPanel
          selectedCount={selection.selectedIds.size}
          visibleCount={filteredScores.length}
          onSelectAll={() => selection.selectAll(filteredScores.map(s => s.id))}
          onDeselectAll={selection.deselectAll}
          onSubmit={handleSubmit}
          isSubmitting={api.submitting}
          isSuccess={api.submitted}
        />

        {/* Grid Component */}
        <GridDisplay
          gridCells={gridCells}
          selectedIds={selection.selectedIds}
          onToggleSelection={selection.toggleSelection}
        />

        {/* Legend Component */}
        <Legend />
      </div>
    </div>
  );
}

