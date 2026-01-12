'use client';

import React from 'react';

interface ControlPanelProps {
  selectedCount: number;
  visibleCount: number;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  isSuccess: boolean;
}

export function ControlPanel({
  selectedCount,
  visibleCount,
  onSelectAll,
  onDeselectAll,
  onSubmit,
  isSubmitting,
  isSuccess,
}: ControlPanelProps) {
  return (
    <div className="bg-white rounded-lg sm:rounded-xl shadow-sm sm:shadow-md p-4 sm:p-6 mb-4 sm:mb-6 border border-gray-100">
      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
          <span className="font-bold text-blue-600">{visibleCount}</span> öğe gösteriliyor |{' '}
          <span className="font-bold text-indigo-600">{selectedCount}</span> seçildi
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <button
            onClick={onSelectAll}
            className="px-3 sm:px-4 py-2 sm:py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs sm:text-sm font-medium rounded-lg transition-colors duration-200"
          >
            Tümünü Seç
          </button>
          <button
            onClick={onDeselectAll}
            className="px-3 sm:px-4 py-2 sm:py-2 bg-gray-600 hover:bg-gray-700 active:bg-gray-800 text-white text-xs sm:text-sm font-medium rounded-lg transition-colors duration-200"
          >
            Seçimi Kaldır
          </button>
          <button
            onClick={onSubmit}
            disabled={selectedCount === 0 || isSubmitting}
            className="px-3 sm:px-4 py-2 sm:py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 active:from-green-700 active:to-emerald-800 disabled:from-gray-400 disabled:to-gray-500 text-white text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Gönderiliyor...' : 'Gönder'}
          </button>
        </div>
      </div>
      {isSuccess && (
        <div className="mt-3 text-sm text-emerald-600 font-medium text-center sm:text-left">
          ✓ Başarıyla gönderildi!
        </div>
      )}
    </div>
  );
}
